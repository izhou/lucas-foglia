var _container = document.querySelector('.home-projects');
var _projects = document.querySelectorAll('.home-project');
var _project_length = _projects.length;
var _active_project;
var _active_project_index;
var _slideshow;

function setActiveProjectIndex(index, scroll) {
  let project = _container.querySelector(`.home-project[data-project-index="${index}"]`);

  if (!project) return;

  if (_active_project) {
    _active_project.classList.remove('is-active');
    clearTimeout(_active_project.gallery.slideshow);
  }

  _active_project = project;
  _active_project_index = index;
  project.gallery.setSlideshow();
  
  _active_project.classList.add('is-active');
  if (scroll) _active_project.scrollIntoView({ behavior: "smooth" });
}

Array.from(document.querySelectorAll('.home-project')).forEach((elem) => {
  elem.gallery = new Gallery(elem, null, true);
});

document.onkeydown = function (e) {
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      setActiveProjectIndex(_active_project_index + 1, true);
      break;
    case 'ArrowUp':
      e.preventDefault();
      setActiveProjectIndex(_active_project_index - 1, true);
      break;
    case 'Escape':
  }
};

onImageClick = function(url) {
  window.location = url;
}

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
        let project_index = parseInt(elem.getAttribute('data-project-index'));
        setActiveProjectIndex(project_index);
        break;
      }
    }
  }, 300);
}, false);

_projects.forEach((elem) => {
  elem.addEventListener('mouseover', function (event) {
    if (elem.classList.contains('is-visible')) {
      let project_index = parseInt(elem.getAttribute('data-project-index'));
      if (project_index !== _active_project_index) setActiveProjectIndex(project_index);
    }
  });

  elem.addEventListener('touchstart', function (event) {
    if (elem.classList.contains('is-visible')) {
      let project_index = parseInt(elem.getAttribute('data-project-index'));
      if (project_index !== _active_project_index) {
        setActiveProjectIndex(project_index);
      }
    }
  });
});

var observer = new IntersectionObserver(function (entries) {
  // leemnt is fully visible
  entries.forEach((entry) => {
    console.log(entry.target.innerText + ': ' + entry['intersectionRatio']);
    entry.target.classList.toggle('is-visible', entry['intersectionRatio'] >= 0.99);
  })
}, { 
  root: document.documentElement,
  threshold: 0.99
});

//  After load to prevent unintended scroll behavior on initial  
window.onload = (event) => {
    Array.from(document.querySelectorAll('.home-project')).forEach((elem) => {
      elem.classList.add('scroll-snap');
    });

    setActiveProjectIndex(0);
  
  // element to observe
  _projects.forEach((elem) => {
    observer.observe(elem);
  });
  // observer.observe(_projects);
}