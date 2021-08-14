const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const client = require('../utils/sanityClient')

// Learn more on https://www.sanity.io/guides/introduction-to-portable-text
module.exports = {
  types: {
    code: ({node}) => '```' + node.language + '\n' + node.code + '\n```',
    accordionText: ({node}) => {
     const body =  BlocksToMarkdown(node.body, { ...client.config() })
      return `<details>${body}<summary>${node.title}</summary></detail>`
    }
  }
}


