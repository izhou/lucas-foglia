// Learn more on https://www.sanity.io/guides/introduction-to-portable-text
module.exports = {
  types: {
    code: ({node}) =>
      '```' + node.language + '\n' + node.code + '\n```',
  }
}
