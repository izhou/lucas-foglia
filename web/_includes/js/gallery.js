class Gallery {
  constructor (el) {
    this.el = el;

    this.active_photo_index;
    this.active_photo_container;
    this.active_photo_info;
    this.length = this.el.getElementsByClassName('gallery-photo-container').length;
    this.slideshow;

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
    console.log('slideshow!' + this.active_photo_index);
    let next_photo = this.getRightPhoto(this.active_photo_index);
    let next_photo_image = next_photo.querySelector('.photo');
    let next_index = next_photo.getAttribute('data-gallery-index');
    lazySizes.loader.unveil(next_photo_image);
    let gallery = this;

    this.slideshow =  setTimeout((e) => {
      if (next_photo_image.classList.contains('lazyloaded')) {
        this.setIndex(next_index);
        this.setSlideshow();
      } else {
        next_photo_image.addEventListener('lazyloaded', function (e) {
          gallery.setIndex(next_index);
          gallery.setSlideshow();
        }, { once: true })
      }
    }, 3000);
  }

  transitionSlideshow(old_photo, new_photo) {

  }

  getLeftPhoto(index) {
    let left_index = index == 0 ? this.length - 1 : index - 1;
    return this.getPhotoFromIndex(left_index);
  }

  getRightPhoto(index) {
    let right_index = index == this.length - 1 ?  0 : index + 1;
    return this.getPhotoFromIndex(right_index);
  }

  setActivePhoto(index) {
    if (index = this.active_index) return;

    let new_photo = this.getPhotoFromIndex(index);
    let old_photo = this.active_photo_container;

    if (!new_photo) return;

    if (old_container) old_container.classList.add('is-hidden');
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

  getPhotoFromIndex(index) {
    return this.el.querySelector(`.gallery-photo-container[data-gallery-index="${index}"]`);
  }

  getLength() {
    return this.length;
  }
}