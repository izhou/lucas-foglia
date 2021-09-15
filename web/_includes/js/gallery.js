class Gallery {
  constructor (el) {
    this.el = el;

    this.active_photo_index;
    this.active_photo_container;
    this.active_photo_info;
    this.length = this.el.getElementsByClassName('gallery-photo-container').length;

    let caption_attr = this.el.getAttribute('data-caption-el');
    if (caption_attr) {
      this.caption_el = document.getElementById(caption_attr);
    }

    this.setIndex(0);
  }

  setIndex(index) {
    if (index == this.active_project_index) return;
    let new_container = this.el.querySelector(`.gallery-photo-container[data-gallery-index="${index}"]`);
    let old_container = this.active_photo_container;

    if (old_container) old_container.classList.add('is-hidden');
    new_container.classList.remove('is-hidden');
    this.active_photo_container = new_container;

    // Set new active info 
    if (this.caption_el) {
      if (this.active_photo_info) this.active_photo_info.classList.add('is-hidden');
      this.active_photo_info = this.caption_el.querySelector(`.gallery-photo-caption-container[data-gallery-index='${index}']`);
      this.active_photo_info.classList.remove('is-hidden');
    }

    this.active_photo_index = parseInt(index);
  }



  setSlideshow() {

  // if (this.in_transition) return;

  // // Inactivate current photo
  // if (old_container) old_container.classList.add('is-transitioning');
  // new_container.classList.add('is-transitioning');
  // new_container.classList.remove('is-hidden');
  // this.in_transition = true;

  // window.setTimeout(() => {
  //   new_container.classList.remove('is-transitioning')
  // }, 1);

  // window.setTimeout(() => {
  //   console.log('hi');
  //   if (old_container) {
  //     old_container.classList.remove('is-transitioning');
  //     old_container.classList.add('is-hidden');
  //   }

  //   this.active_photo_container = new_container;
  //   this.in_transition = false;
  // }, 5100);

  }

  goLeft() {
    let index = this.active_photo_index == 0 ? this.length - 1 : this.active_photo_index - 1;
    return this.setIndex(index);
  }

  goRight() {
    let index = this.active_photo_index == this.length - 1 ? 0 : this.active_photo_index + 1;
    return this.setIndex(index);
  }

  getIndex() {
    return this.active_photo_index;
  }

  getLength() {
    return this.length;
  }
}