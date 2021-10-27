const groq = require('groq')
const client = require('../utils/sanityClient')


module.exports = async function() {
  return await client.fetch(groq`
    *[_id == "siteSettings"]{
      ...,
      timeline[] -> {
        _id,
        title,
        slug,
        gallery[homepage == true] {
          _key,
          asset
        },
        aspect_ratio
      },
      sidebar[] {
        ...,
        _type == "project" => {
          "title": @->title,
          "slug": @->slug.current,
        },
        _type == "page" => {
          "title": @->title,
          "slug": @->slug.current,
        }
      }
    }[0]
  `)
}
