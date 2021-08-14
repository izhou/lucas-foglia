export default {
  name: 'accordionText',
  type: 'object',
  title: 'Accordion Text',
  fields:[
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      options: {
        isHighlighted: true
      }
    },
    {
      name: 'body',
      type: 'excerptPortableText',
      title: 'Body',
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}