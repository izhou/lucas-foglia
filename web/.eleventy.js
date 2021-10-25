const util = require('util')
const CleanCSS = require("clean-css");
const urlFor = require('./utils/imageUrl');

const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItCollapsible = require("markdown-it-collapsible");

const heroicons = require('eleventy-plugin-heroicons');
const favicon = require('eleventy-favicon');

module.exports = function(eleventyConfig) {

  // https://www.11ty.io/docs/quicktips/inline-css/
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter("debug", function(value) {
    return util.inspect(value, {compact: false})
   });

  const md = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#"
  }).use(markdownItCollapsible);

  eleventyConfig.addFilter("markdownify", function (value) {
    return md.render(value)
  });

  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addPlugin(heroicons);
  eleventyConfig.addPlugin(favicon);
  
  eleventyConfig.addShortcode('imageUrlFor', (image, thumb) => {
    return urlFor(image, thumb);
  })

  eleventyConfig.addPassthroughCopy({
    "_includes/styles/fonts": "assets/fonts",
    "_includes/assets/":"assets/img",
    "node_modules/lazysizes/lazysizes.min.js": "assets/lazysizes.min.js",
  });

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
}
