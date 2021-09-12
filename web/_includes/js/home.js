var _container = document.querySelector('.home-projects');
var _projects = document.querySelectorAll('.home-projects > .home-project');
var _project_length = _projects.length;
var _active_project;
var _active_project_index;


var observer = new IntersectionObserver(function (entries) {
  // find the entry with the largest intersection ratio
  var active_project = entries.reduce(function (max, entry) {
    return (entry.intersectionRatio > max.intersectionRatio) ? entry : max;
  }).target;

  setActiveProject(active_project);
}, {
  root: _container, threshold: 1
});

for (var i = 0; i < _projects.length; i++) {
  observer.observe(_projects[i]);
}

function setActiveProject(project) {
  if (_active_project) _active_project.classList.remove('is-active');
  _active_project = project;
  _active_project_index = project.getAttribute('data-project-index');
  
  _active_project.classList.add('is-active');
}

// function setActiveProjectByIndex(index) {
//   let project = _projects.querySelector(`[data-project-index="${index}"]`);

//   if (project) return setActiveProject(project);
// }

// function goDown() {
//   if (_active_project_index < _project_length - 1) return setActiveProject(_active_project_index + 1);
// }

Array.from(document.querySelectorAll('.home-project')).forEach((elem) => {
  elem.gallery = new Gallery(elem);
});

document.onkeyup = function (e) {
  switch (e.key) {
    case 'ArrowLeft':
      if (_active_project.gallery) _active_project.gallery.goLeft();
      break;
    case 'ArrowRight':
      if (_active_project.gallery) _active_project.gallery.goRight();
      break;
    case 'ArrowDown':
      _container.scroll();
      break;
    case 'Escape':
      // return showContainer('project-index');
  }
};

document.querySelector('.home-projects').click();