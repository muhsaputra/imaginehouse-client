export default {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    {name: 'title', type: 'string', title: 'Title'},
    {name: 'subtitle', type: 'string', title: 'Subtitle'},
    {name: 'description', type: 'text', title: 'Description'},
    {name: 'heroImage', type: 'image', title: 'Hero Image (Breadcrumb)'},
    {name: 'images', type: 'array', title: 'Images', of: [{type: 'image'}]},
  ],
}
