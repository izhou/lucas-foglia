var _container = document.querySelector('.home-projects');
var _projects = document.querySelectorAll('.home-projects > .home-project');
var _project_length = _projects.length;
var _active_project;
var _active_project_index;

function setActiveProjectIndex(index, scroll) {
  let project = _container.querySelector(`.home-project[data-project-index="${index}"]`);

  if (!project) return;

  if (_active_project) _active_project.classList.remove('is-active');
  _active_project = project;
  _active_project_index = parseInt(index);
  
  _active_project.classList.add('is-active');
  if (scroll) _active_project.scrollIntoView({ behavior: "smooth", block: "center" });
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

//  After load to prevent unintended scroll behavior on initial  
window.onload = (event) => {
    Array.from(document.querySelectorAll('.home-project')).forEach((elem) => {
      elem.classList.add('scroll-snap');
    });

  let observer = new IntersectionObserver((entries) => {
    let active_project = entries.reduce((entry, max) => {
      console.log('entry: '+ entry.target.innerText + ' ' + entry.intersectionRatio);
      console.log('max: ' + max.target.innerText + ' ' + max.intersectionRatio);
      return entry.intersectionRatio > max.intersectionRatio ? entry : max;
    });

    let index = active_project.target.getAttribute('data-project-index');
    setActiveProjectIndex(index);
  }, {
    root: _container,
    threshold: [0.9, 1]
  });

  Array.from(document.querySelectorAll('.home-project')).forEach((elem) => {
    observer.observe(elem);
  });

  setActiveProjectIndex(0);
}

window.setInterval((e) => {
  _active_project.gallery.goRight();
}, 1000);