// ./schemas/portfolio.js
export default {
  name: 'portfolio',
  title: 'Portfolio Carousel Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Judul',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    },
    {
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          {title: 'Video Production', value: 'Video Production'},
          {title: 'Photography', value: 'Photography'},
          {title: 'Film Production', value: 'Film Production'},
          {title: 'Lainnya', value: 'Lainnya'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Deskripsi Singkat',
      type: 'text',
      rows: 3,
      description: 'Gambaran singkat tentang proyek ini',
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Deskripsi untuk aksesibilitas & SEO',
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'gallery',
      title: 'Gallery (Opsional)',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      description: 'Tambahkan beberapa foto atau visual tambahan',
    },
    {
      name: 'publishedAt',
      title: 'Tanggal Publikasi',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
}
