export default {
  name: 'project',
  type: 'document',
  title: 'Projects',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'The website URL ending.',
      options: {
        source: 'title',
        maxLength: 96
      }
    },

    {
      name: 'excerpt',
      type: 'excerptPortableText',
      title: 'Excerpt',
      description:
        'A short description of the project. This ends up on summary pages, on Google, when people share your post in social media.'
    },

    {
      name: 'statement',
      type: 'bodyPortableText',
      title: 'Statement',
      description:
        'The full project statement.'
    },

    {
      name: 'gallery',
      type: 'array',
      description:
        `You can drag and drop multiple images directly onto this section here. Click on each image to edit it's information. Drag and drop them to rearrange their order.`,
      options: {
        layout: 'grid'
      },
      of: [{
        type: 'photo'
      }]
    }
  ],
}
