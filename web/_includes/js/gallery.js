class Gallery {
  constructor (el, caption_el) {
    this.el = el;
    this.caption_el = caption_el;
    this.length = this.el.getElementsByClassName('gallery-photo-container').length;

    this.active_photo_index = 0;
    this.active_photo_container;
    this.active_photo_info;
  }

  setIndex(index) {
    // Inactivate current photo
    if (this.active_photo_container) this.active_photo_container.classList.add('is-hidden');
    if (this.active_photo_info) this.active_photo_info.classList.add('is-hidden');

    // Set new active photo
    this.active_photo_container = this.el.querySelector(`.gallery-photo-container[data-gallery-index="${index}"]`);
    if (!this.active_photo_container) return;

    this.active_photo_container.classList.remove('is-hidden');

    console.log('info');
    // Set new active info 
    if (this.caption_el) {
      this.active_photo_info = this.caption_el.querySelector(`.gallery-photo-caption-container[data-gallery-index='${index}']`);
      this.active_photo_info.classList.remove('is-hidden');
    }

    this.active_photo_index = index;
  }

  getIndex() {
    return this.active_photo_index;
  }

  getLength() {
    return this.length;
  }

  goLeft() {
    let index = this.active_photo_index == 0 ? this.length - 1 : this.active_photo_index - 1;
    return this.setIndex(index);
  }
  
  goRight() {
    let index = this.active_photo_index == this.length - 1 ? 0 : this.active_photo_index + 1;
    return this.setIndex(index);
  }

}