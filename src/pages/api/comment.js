// /pages/api/comment.js
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2025-09-03", // tanggal hari ini
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // pakai token yang kamu buat
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, comment, postId } = req.body;

    try {
      await client.create({
        _type: "comment",
        name,
        email,
        comment,
        approved: false, // tetap false
        post: { _type: "reference", _ref: postId },
      });

      return res.status(200).json({ message: "Komentar terkirim!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Gagal mengirim komentar" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
