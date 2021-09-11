async function displayGalleries() {
  const galleries = document.getElementsByClassName(`home-timeline-project-gallery`);
  
  let resp = await fetch('/timeline.json');
  let data = await resp.json();

  Array.from(galleries).forEach((gallery) => 
  {
    const tiles = chooseRandomTiles(gallery);
    displayTiles(tiles);
  });
}

function chooseRandomTiles(gallery) {
  const tiles = gallery.getElementsByClassName(`home-timeline-project-tile`);
  const shuffled = Array.from(tiles).sort(() => 0.5 - Math.random());
  // Randomly select 3-5 images
  const num_images = Math.floor(Math.random() * 6) + 3;
  const random = shuffled.slice(0, num_images);
  console.log(random)
  return random;

}

function displayTiles(tiles) {
  Array.from(tiles).forEach((elem, index ) => {

    elem.classList.remove('is-hidden'); 
    window.setTimeout(()=> {elem.style.opacity = "1";}, index * 300);
  });
}

displayGalleries();

