export default {
  name: 'photo',
  type: 'image',
  title: 'Photo',
  options: {
    hotspot: false
  },
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.error('You must include a title.').required(),
      options: {
        isHighlighted: true
      }
    },
    {
      name: 'caption',
      type: 'excerptPortableText',
      title: 'Caption',
      options: {
        isHighlighted: true,
        maxLength: 140,
      }
    },
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Important for SEO and accessiblity.',
      options: {
        isHighlighted: true
      }
    }
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
    }
  }
}
