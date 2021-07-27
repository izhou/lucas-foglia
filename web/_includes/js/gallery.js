var _gallery_index = 0;
var _gallery_image_container;
var _gallery_image_info;
var _gallery_length = document.getElementsByClassName('project-gallery-image-container').length;

function showContainer(container) {
  const links = document.getElementsByClassName(`project-info--link`);
  const containers = document.getElementsByClassName('l-grid-content-container');
  const project_info = document.getElementsByClassName('project-info--photo');

  Array.from(containers).forEach((elem) => { elem.classList.add('is-hidden'); });
  Array.from(links).forEach((elem) => { elem.classList.remove('container-active'); });
  Array.from(project_info).forEach((elem) => { elem.classList.toggle('is-hidden', container != 'project-gallery'); });

  document.getElementById(container).classList.remove('is-hidden');
  document.querySelector(`[data-container="${container}"]`).classList.add('container-active');
};

function onIndexClick(index) {
  setGalleryImage(index);
  showContainer('project-gallery');
}

function setGalleryImage(index) {
  if (_gallery_image_container) _gallery_image_container.classList.add('is-hidden');
  if (_gallery_image_info) Array.from(_gallery_image_info).forEach((elem) => { elem.classList.add('is-hidden') });


  _gallery_image_container = document.querySelector(`.project-gallery-image-container[data-gallery-index="${index}"]`);
  _gallery_image_info = document.querySelectorAll(`.project-gallery-image-info[data-gallery-index='${index}']`);

  _gallery_image_container.classList.remove('is-hidden');
  Array.from(_gallery_image_info).forEach((elem) => { elem.classList.remove('is-hidden')});

  _gallery_index = index;
}

function goLeft() {
  let index = _gallery_index == 0 ? _gallery_length - 1 : _gallery_index - 1;
  return setGalleryImage(index);
}

function goRight() {
  let index = _gallery_index == _gallery_length - 1 ? 0 : _gallery_index + 1;
  return setGalleryImage(index);
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

setGalleryImage(_gallery_index);