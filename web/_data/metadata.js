const groq = require('groq')
const client = require('../utils/sanityClient')

 async function test() {
  const a = await client.fetch(groq`
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

  console.log(JSON.stringify(a));
  return a;

}

module.exports = test;