export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: ['update', /*'create', 'delete',*/ 'publish'],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Describe your website for search engines and social media.'
    },

    {
      name: 'sidebar',
      type: 'array',
      title: 'Sidebar',
      description: 'Add the contents of your sidebar ',
      of: [
        {
          title: 'Heading',
          type: 'object',
          fields: [
            {
              title: 'Header String',
              name: 'header',
              type: 'string'
            }
          ],
        },
        {
          name: 'project',
          type: 'reference',
          to: [{ type: 'project' }]
        },
        {
          name: 'page',
          type: 'reference',
          to: [{ type: 'page' }]
        }
      ],
    },

    {
      name: 'timeline',
      type: 'array',
      title: 'Homepage Timeline',
      description: 'The items will appear in order on your timeline',
      of: [
        {
          name: 'project',
          type: 'reference',
          to: [{type: 'project'}]
        }
      ]
    }
  ]
}
