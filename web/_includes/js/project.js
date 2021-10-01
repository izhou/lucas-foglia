let _active_container;

var gallery = new Gallery(document.getElementById('project-gallery'));

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

  setWindowHash();
};

let opening_hash = window.location.hash.slice(1);

if (opening_hash == 'statement') {
  showContainer('project-statement');
} else if (/^\d+$/.test(opening_hash) && opening_hash < gallery.getLength()) {
  gallery.setActivePhotoByIndex(opening_hash);
  showContainer('project-gallery');
} else if (/^i[\d]+/.test(opening_hash)) {
  let photo_index = opening_hash.slice(1);
  let elem = document.querySelector(`.project-index-photo[data-gallery-index="${photo_index}"]`);
  showContainer('project-index');
  if (elem) elem.scrollIntoView();
} else {
  showContainer('project-index');
}

function onIndexClick(index) {
  gallery.setActivePhotoByIndex(index);
  showContainer('project-gallery');
}

function setWindowHash() {
  let hash;
  switch (_active_container) {
    case 'project-index':
      hash = "";
      break;
    case 'project-gallery':
      hash = gallery.getIndex().toString();
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

document.onkeyup = function (e) {
  switch (e.key) {
    case 'ArrowLeft':
      gallery.goLeft();
      return setWindowHash();
    case 'ArrowRight':
      gallery.goRight();
      return setWindowHash();
    case 'Escape':
      return showContainer('project-index');
  }
};

document.addEventListener('swiped-left', function (e) {
  gallery.goRight();
  return setWindowHash();
});

document.addEventListener('swiped-right', function (e) {
  gallery.goLeft();
  return setWindowHash();
});

window.addEventListener("load", init);

function init() {
  let gallery_el = gallery.el;
  let onClick;

  gallery_el.addEventListener("mousemove", function (e) {
    const xPos = e.pageX;
    const dimensions = gallery_el.getBoundingClientRect();
    const half_width = (dimensions.left + dimensions.right) / 2;

    if (xPos > half_width) {
      this.classList.add("gallery--nav-right");
      this.classList.remove("gallery--nav-left");
      onClick = gallery.goRight.bind(gallery);
    } else {
      this.classList.add("gallery--nav-left");
      this.classList.remove("gallery--nav-right");
      onClick = gallery.goLeft.bind(gallery);
    }
  });

  gallery_el.addEventListener("click", function(e) {
    return onClick();
  })
}
