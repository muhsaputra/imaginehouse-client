import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold text-[#841618] mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Tentang Kami
        </motion.h2>
        <motion.p
          className="text-lg text-neutral-700 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Imagine House adalah creative studio berbasis di Indonesia yang
          bergerak di bidang fotografi, videografi, dan produksi konten kreatif.
          Kami membantu personal dan brand dalam menyampaikan pesan mereka
          secara visual yang menarik, profesional, dan berdampak.
        </motion.p>
      </div>
    </section>
  );
}
