export const getAllBlogs = `
  *[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "imageUrl": mainImage.asset->url,
    "author": author->{
      name,
      "imageUrl": image.asset->url
    },
    tags
  }
`;
