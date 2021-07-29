var _gallery_index = 0;
var _gallery_photo_container;
var _gallery_photo_info;
var _gallery_length = document.getElementsByClassName('project-gallery-photo-container').length;

function showContainer(container) {
  const links = document.getElementsByClassName(`project-info--link`);
  const containers = document.getElementsByClassName('grid-right-content');
  const photo_info = document.getElementsByClassName('project-photo-info');

  Array.from(containers).forEach((elem) => { elem.classList.add('is-hidden'); });
  Array.from(links).forEach((elem) => { elem.classList.remove('container-active'); });
  Array.from(photo_info).forEach((elem) => { elem.classList.toggle('is-hidden', container != 'project-gallery'); });

  document.getElementById(container).classList.remove('is-hidden');
  document.querySelector(`[data-container="${container}"]`).classList.add('container-active');
};

function onIndexClick(index) {
  setGalleryPhoto(index);
  showContainer('project-gallery');
}

function setGalleryPhoto(index) {
  if (_gallery_photo_container) _gallery_photo_container.classList.add('is-hidden');
  if (_gallery_photo_info) Array.from(_gallery_photo_info).forEach((elem) => { elem.classList.add('is-hidden') });


  _gallery_photo_container = document.querySelector(`.project-gallery-photo-container[data-gallery-index="${index}"]`);
  _gallery_photo_info = document.querySelectorAll(`.project-photo-info-container[data-gallery-index='${index}']`);

  _gallery_photo_container.classList.remove('is-hidden');
  Array.from(_gallery_photo_info).forEach((elem) => { elem.classList.remove('is-hidden')});

  _gallery_index = index;
}

function goLeft() {
  let index = _gallery_index == 0 ? _gallery_length - 1 : _gallery_index - 1;
  return setGalleryPhoto(index);
}

function goRight() {
  let index = _gallery_index == _gallery_length - 1 ? 0 : _gallery_index + 1;
  return setGalleryPhoto(index);
}

document.onkeyup = function (e) {
  switch (e.key) {
    case 'ArrowLeft':
      return goLeft();
    case 'ArrowRight':
      return goRight();
    case 'Escape':
      return showContainer('project-index');
  }
};

setGalleryPhoto(_gallery_index);