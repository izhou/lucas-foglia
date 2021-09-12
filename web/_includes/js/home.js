// async function displayGalleries() {
//   const galleries = document.getElementsByClassName(`home-timeline-project-gallery`);
  
//   let resp = await fetch('/timeline.json');
//   let data = await resp.json();

//   Array.from(galleries).forEach((gallery) => 
//   {
//     const tiles = chooseRandomTiles(gallery);
//     displayTiles(tiles);
//   });
// }

// function chooseRandomTiles(gallery) {
//   const tiles = gallery.getElementsByClassName(`home-timeline-project-tile`);
//   const shuffled = Array.from(tiles).sort(() => 0.5 - Math.random());
//   // Randomly select 3-5 images
//   const num_images = Math.floor(Math.random() * 6) + 3;
//   const random = shuffled.slice(0, num_images);
//   return random;

// }

// function displayTiles(tiles) {
//   Array.from(tiles).forEach((elem, index ) => {

//     elem.classList.remove('is-hidden'); 
//     window.setTimeout(()=> {elem.style.opacity = "1";}, index * 300);
//   });
// }

// displayGalleries();


var _container = document.querySelector('.home-projects');
var _projects = document.querySelectorAll('.home-projects > .home-project');
var _active_project_index = 0;


var observer = new IntersectionObserver(function (entries) {
  // find the entry with the largest intersection ratio
  var active_project = entries.reduce(function (max, entry) {
    console.log(entry);
    return (entry.intersectionRatio > max.intersectionRatio) ? entry : max;
  }).target;

  Array.from(_projects).forEach((elem) => { elem.classList.remove('is-active') });
  active_project.classList.add('is-active');
  _active_project_index = active_project.getAttribute('data-project-index');
}, {
  root: _container, threshold: 0.8
});

for (var i = 0; i < _projects.length; i++) {
  observer.observe(_projects[i]);
}


// var carousel = document.querySelector('.carousel');
// var elements = document.querySelectorAll('.carousel > *');
// var currentIndex = 0;


// var observer = new IntersectionObserver(function (entries, observer) {
//   // find the entry with the largest intersection ratio
//   var activated = entries.reduce(function (max, entry) {
//     return (entry.intersectionRatio > max.intersectionRatio) ? entry : max;
//   });
//   if (activated.intersectionRatio > 0) {
//     currentIndex = elementIndices[activated.target.getAttribute("id")];
//     renderIndicator();
//   }
// }, {
//   root: carousel, threshold: 0.5
// });
// var elementIndices = {};
// for (var i = 0; i < elements.length; i++) {
//   elementIndices[elements[i].getAttribute("id")] = i;
//   observer.observe(elements[i]);
// }