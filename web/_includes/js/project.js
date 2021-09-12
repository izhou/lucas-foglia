let _active_container;

var gallery = new Gallery(
  document.getElementById('project-gallery'),
  document.getElementById('project-gallery-captions')
);

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

// Read location hash
let opening_hash = window.location.hash.slice(1);

if (opening_hash == 'statement') {
  showContainer('project-statement');
} else if (/^\d+$/.test(opening_hash) && opening_hash < gallery.getLength()) {
  gallery.setIndex(opening_hash);
  showContainer('project-gallery');
} else {
  showContainer('project-index');
}

function onIndexClick(index) {
  gallery.setIndex(index);
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