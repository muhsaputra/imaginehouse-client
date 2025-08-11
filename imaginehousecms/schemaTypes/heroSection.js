export default {
  name: 'heroSection',
  title: 'Hero Section & Background',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'subtitle', title: 'Subtitle', type: 'string'},
    {name: 'description', title: 'Description', type: 'text'},
    {
      name: 'backgroundImages',
      title: 'Background Images',
      type: 'array',
      of: [{type: 'image'}],
    },
    {
      name: 'primaryButtonText',
      title: 'Primary Button Text',
      type: 'string',
    },
    {
      name: 'primaryButtonLink',
      title: 'Primary Button Link',
      type: 'url',
    },
    {
      name: 'secondaryButtonText',
      title: 'Secondary Button Text',
      type: 'string',
    },
    {
      name: 'secondaryButtonLink',
      title: 'Secondary Button Link',
      type: 'url',
    },
  ],
}
