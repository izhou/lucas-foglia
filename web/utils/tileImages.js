function chooseTileImages(gallery) {
  // Choose randomly 3-5
  const shuffled = gallery.sort(() => 0.5 - Math.random());
  const num_images = Math.floor(Math.random() * 2) * 2 + 3;

  return shuffled.slice(0, num_images);
}

module.exports = chooseTileImages;
