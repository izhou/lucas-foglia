const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const groq = require('groq')
const client = require('../utils/sanityClient.js')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const hasToken = !!client.config().token

function generateProject (project) {
  return {
    ...project,
    statement: BlocksToMarkdown(project.statement, { serializers, ...client.config() })
  }
}

async function getProjects () {
  // Learn more: https://www.sanity.io/docs/data-store/how-queries-work
  const filter = groq`*[_type == "project" && defined(slug)]`
  const projection = groq`{
    _id,
    title,
    slug,
    statement[]{
      ...,
      children[]{
        ...,
      }
    },
  }`
  const query = [filter, projection ].join(' ')
  const docs = await client.fetch(query).catch(err => console.error(err))
  const reducedDocs = overlayDrafts(hasToken, docs)
  const prepareProjects = reducedDocs.map(generateProject)
  console.log('prepare Projects:' + JSON.stringify(prepareProjects));
  return prepareProjects
}

module.exports = getProjects
