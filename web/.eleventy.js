const { DateTime } = require("luxon");
const util = require('util')
const CleanCSS = require("clean-css");
const urlFor = require('./utils/imageUrl');


module.exports = function(eleventyConfig) {

  // https://www.11ty.io/docs/quicktips/inline-css/
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter("debug", function(value) {
    return util.inspect(value, {compact: false})
   });

   eleventyConfig.addFilter("readableDate", dateObj => {
    return new Date(dateObj).toDateString()
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let markdownItCollapsible = require("markdown-it-collapsible");

  const md = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#"
  }).use(markdownItCollapsible);

  eleventyConfig.setLibrary("md", md);


  eleventyConfig.addPlugin(require('eleventy-plugin-heroicons'));

  eleventyConfig.addShortcode('imageUrlFor', (image, thumb) => {
    return urlFor(image, thumb);
  })

  eleventyConfig.addPassthroughCopy({
    "_includes/styles/fonts": "assets/fonts",
    "_includes/assets/":"assets/img",
    "node_modules/lazysizes/lazysizes.min.js": "assets/lazysizes.min.js",
  });

  eleventyConfig.addFilter("markdownify", function(value) {
    return md.render(value)
  });

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
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
