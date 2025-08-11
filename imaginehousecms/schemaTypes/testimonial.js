export default {
  name: 'testimonial',
  title: 'Testimonial Section',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nama',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'designation',
      title: 'Jabatan / Perusahaan',
      type: 'string',
    },
    {
      name: 'quote',
      title: 'Testimoni',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Foto',
      type: 'image',
      options: {hotspot: true},
    },
  ],
}
