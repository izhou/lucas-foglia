let _active_container;
let _gallery = new Gallery(document.getElementById('project-gallery'));

function showContainer(container) {
  _active_container = container;
  const links = document.getElementsByClassName(`project-info--link`);
  const containers = document.getElementsByClassName('grid-right-content');
  const captions = document.getElementById('project-gallery-captions');

  Array.from(containers).forEach((elem) => { elem.classList.add('is-hidden'); });
  Array.from(links).forEach((elem) => { elem.classList.remove('container-active'); });

  // Only show captions when gallery is active
  captions.classList.toggle('is-hidden', _active_container != 'project-gallery');

  document.getElementById(container).classList.remove('is-hidden');
  document.querySelector(`[data-container="${_active_container}"]`).classList.add('container-active');


  if (_active_container == 'project-index') {
    let photo_index = _gallery.getActiveIndex();
    let elem = document.querySelector(`.project-index-photo[data-gallery-index="${photo_index}"]`);
    if (elem) elem.scrollIntoView();
  }

  setWindowHash();
};

function onIndexClick(index) {
  _gallery.setActivePhotoByIndex(index);
  showContainer('project-gallery');
}

function setWindowHash() {
  let hash;
  switch (_active_container) {
    case 'project-index':
      hash = "";
      break;
    case 'project-gallery':
      hash = _gallery.getActiveIndex().toString();
      break;
    case 'project-statement':
      hash = "statement";
      break;
  }

  if (hash) {
    window.location.hash = hash
  } else {
    history.replaceState(null, null, ' ');
  }
}

let opening_hash = window.location.hash.slice(1);

if (opening_hash == 'statement') {
  showContainer('project-statement');
} else if (/^\d+$/.test(opening_hash) && opening_hash < _gallery.getLength()) {
  _gallery.setActivePhotoByIndex(parseInt(opening_hash));
  showContainer('project-gallery');
} else if (/^i[\d]+/.test(opening_hash)) {
  let index = parseInt(opening_hash.slice(1));
  _gallery.setActivePhotoByIndex(index);
  showContainer('project-index');
} else {
  showContainer('project-index');
}

document.onkeyup = function (e) {
  switch (e.key) {
    case 'ArrowLeft':
      _gallery.goLeft();
      return setWindowHash();
    case 'ArrowRight':
      _gallery.goRight();
      return setWindowHash();
    case 'Escape':
      return showContainer('project-index');
  }
};

document.addEventListener('swiped-left', function (e) {
  _gallery.goRight();
  return setWindowHash();
});

document.addEventListener('swiped-right', function (e) {
  _gallery.goLeft();
  return setWindowHash();
});

document.querySelectorAll('.project-info--link').forEach(item => {
  let container = item.getAttribute('data-container');
  item.addEventListener('click', event => showContainer(container));
});

document.querySelectorAll('.project-index-photo').forEach(item => {
  let index = parseInt(item.getAttribute('data-gallery-index'));
  item.addEventListener('click', event => onIndexClick(index));
});

window.onload = (event) => {
  let gallery_el = _gallery.el;
  let onImageClick;

  gallery_el.addEventListener("mousemove", function (e) {
    const xPos = e.pageX;
    const dimensions = gallery_el.getBoundingClientRect();
    const half_width = (dimensions.left + dimensions.right) / 2;

    if (xPos > half_width) {
      this.classList.add("gallery--nav-right");
      this.classList.remove("gallery--nav-left");
      onImageClick = _gallery.goRight.bind(_gallery);
    } else {
      this.classList.add("gallery--nav-left");
      this.classList.remove("gallery--nav-right");
      onImageClick = _gallery.goLeft.bind(_gallery);
    }
  });

  gallery_el.addEventListener("click", function(e) {
    return onImageClick();
  })
}
