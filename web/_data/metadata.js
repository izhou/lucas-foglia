const groq = require('groq')
const client = require('../utils/sanityClient')


module.exports = async function() {
  return await client.fetch(groq`
    *[_id == "siteSettings"]{
      ...,
      sidebar[] {
        ...,
        _type == "project" => {
          "title": @->title,
          "slug": @->slug.current,
        }
      }
    }[0]
  `)
}
