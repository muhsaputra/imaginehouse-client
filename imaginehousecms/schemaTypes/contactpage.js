export default {
  name: 'contactpage',
  title: 'Contact BreadCrumb',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Judul Halaman',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'heroImage',
      title: 'Gambar Latar (Hero)',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
  ],
}
