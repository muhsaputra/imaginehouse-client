// schemaTypes/comment.js
export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nama',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'comment',
      title: 'Komentar',
      type: 'text',
    },
    {
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description: 'Komentar harus disetujui sebelum tampil',
      initialValue: false,
    },
    {
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{type: 'blog'}],
    },
  ],
}
