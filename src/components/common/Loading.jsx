import { motion } from "framer-motion";

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center text-white bg-gradient-to-b from-[#841618] to-[#5e0f11]"
    >
      {/* Logo diam dengan efek shine */}
      <div className="relative w-24 h-24 mb-6 overflow-hidden ">
        <img
          src="/vite.svg" // ganti dengan logo kamu
          alt="Logo"
          className="w-full h-full relative z-10"
        />
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 z-20"
          initial={{ x: "-150%" }}
          animate={{ x: "150%" }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1.5,
          }}
        >
          <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent rotate-12" />
        </motion.div>
      </div>

      {/* Animasi Loading dengan dot */}
      <motion.div
        className="flex space-x-1 text-lg font-semibold tracking-wider"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {["L", "o", "a", "d", "i", "n", "g", ".", ".", "."].map(
          (letter, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: { opacity: 0.3, y: 0 },
                visible: {
                  opacity: 1,
                  y: -3,
                  transition: {
                    duration: 0.3,
                    repeat: Infinity,
                    repeatType: "mirror",
                  },
                },
              }}
            >
              {letter}
            </motion.span>
          )
        )}
      </motion.div>
    </motion.div>
  );
}
