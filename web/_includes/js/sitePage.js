class Accordion {
  constructor(el) {
    this.el = el;
    this.summary = el.querySelector('summary');
    this.content = el.querySelectorAll(':not(content)');
    this.animation = null;
    
    this.summary.addEventListener('click', (e) => this.onClick(e));
  }

  onClick(e) {
    e.preventDefault();
    this.el.style.overflow = 'hidden';
    if (!this.el.open) {
      this.open();
    } else if (this.el.open) {
      this.shrink();
    }
  }

  shrink() {
    const endHeight = `${this.summary.offsetHeight}px`;
    const startHeight = `${this.el.offsetHeight}px`;

    this.el.style.height = endHeight;
    this.animation = this.el.animate({
      height: [startHeight, endHeight]
    }, {
      duration: 200,
      easing: 'ease-out'
    });

    this.animation.onfinish = () =>  {
      this.el.open = false;
      this.animation = null;
    }
  }

  open() {
    const startHeight = this.el.offsetHeight;
    // explicitly set for animation calculation
    this.el.style.height = `${startHeight}px`;

    this.el.open = true;
    const contentHeight = Array.from(this.content).map((el) => el.offsetHeight).reduce((a, b) => a + b, 0);
    const endHeight = `${this.summary.offsetHeight + contentHeight}px`;

    this.animation = this.el.animate({
      height: [startHeight, endHeight]
    }, {
      duration: 200,
      easing: 'ease-out'
    });

    this.animation.onfinish = () => {
      this.el.style.height = endHeight;
      this.animation = null;
    }
  }
}

document.querySelectorAll('details').forEach((el) => {
  new Accordion(el);
});