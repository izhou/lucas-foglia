export default {
  name: 'project',
  type: 'document',
  title: 'Projects',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.error('You must include a title.').required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'The website URL ending.',
      validation: Rule => Rule.error('You must include a slug.').required(),
      options: {
        source: 'title',
        maxLength: 96
      }
    },

    {
      name: 'excerpt',
      type: 'blockPortableText',
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
  preview: {
    select: {
      title: 'title',
      gallery: 'gallery',
    },
    prepare(selection) {
      const {title, gallery } = selection;
      
      if (gallery && gallery[0] && gallery[0].asset) {
        return {
          title: title,
          media: gallery[0].asset
        };
      }

      return {
        title: title,
      }
    }
  }
}
