var _container = document.querySelector('.home-projects');
var _projects = document.querySelectorAll('.home-project');
var _project_length = _projects.length;
var _active_project;
var _active_project_index;

function onImageClick(project_index, url) {
  if (_active_project_index == project_index) return window.location = url;

  return setActiveProjectByIndex(project_index, true);
}

function setActiveProject(elem, index, scroll) {
  if (_active_project) {
    _active_project.classList.remove('is-active');
    clearTimeout(_active_project.gallery.slideshow);
  }

  _active_project = elem;
  _active_project_index = index;
  elem.gallery.setSlideshow();

  _active_project.classList.add('is-active');
  if (scroll) _active_project.scrollIntoView({ behavior: "smooth" });
}

function setActiveProjectByElem(elem, scroll) {
  let index = parseInt(elem.getAttribute('data-project-index'));

  setActiveProject(elem, index, scroll);
}

function setActiveProjectByIndex(index, scroll) {
  let project = _container.querySelector(`.home-project[data-project-index="${index}"]`);
  if (!project) return;

  return setActiveProject(project, index, scroll);
}

// Kicks off gallery
Array.from(document.querySelectorAll('.home-project')).forEach((elem) => {
  elem.gallery = new Gallery(elem, null, true);
});

document.onkeydown = function (e) {
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      setActiveProjectByIndex(_active_project_index + 1, true);
      break;
    case 'ArrowUp':
      e.preventDefault();
      setActiveProjectByIndex(_active_project_index - 1, true);
      break;
    case 'Escape':
  }
};

let isScrolling;

_container.addEventListener('scroll', function (event) {
  // Clear our timeout throughout the scroll
  window.clearTimeout(isScrolling);
  // Set a timeout to run after scrolling ends
  isScrolling = setTimeout(function () {
    let endscroll = event.target.scrollTop + event.target.offsetTop;
    for (let i = 0; i < _projects.length; i++) {
      let elem = _projects[i];
      let offset_top = elem.offsetTop;
      // Sometimes scroll-snap is off by a few pixels
      if (endscroll <= offset_top + 5 && endscroll >= offset_top - 5) {
        setActiveProjectByElem(elem);
        break;
      }
    }
  }, 10);
}, false);

_projects.forEach((elem) => {
  elem.addEventListener('mouseover', function (event) {
    if (elem.classList.contains('is-visible') && elem !== _active_project) {
      event.preventDefault();
      setActiveProjectByElem(elem);
    }
  });
});

// Observes whether image is fullly visible in dom. 
var observer = new IntersectionObserver(function (entries) {
  // element is fully visible, some room for error for off-by-one pixels
  entries.forEach((entry) => {
    entry.target.classList.toggle('is-visible', entry['intersectionRatio'] >= 0.98);
  })
}, { 
  root: document.documentElement,
  threshold: 0.98
});

//  After load to prevent unintended scroll behavior on initial  
window.onload = (event) => {
    Array.from(document.querySelectorAll('.home-project')).forEach((elem) => {
      elem.classList.add('scroll-snap');
    });

    setActiveProjectByIndex(0);
  
  // element to observe
  _projects.forEach((elem) => {
    observer.observe(elem);
  });
}