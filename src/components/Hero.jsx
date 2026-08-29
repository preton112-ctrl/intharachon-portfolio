import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 0.61, 0.36, 1] },
  }),
}

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="grid min-h-[90vh] grid-cols-1 pt-19 lg:h-screen lg:grid-cols-2"
    >
      <div className="order-2 flex h-full flex-col justify-center bg-white p-8 text-left lg:order-1 lg:p-16">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="mb-5 text-[11px] font-medium uppercase tracking-[0.26em] text-gray-500"
        >
          Kaeng Khro, Chaiyaphum · Thailand
        </motion.p>

        <motion.h1
          id="hero-title"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.1}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.98] tracking-tight text-gray-900 uppercase"
        >
          Portfolio <span className="text-patina">Phoomrapee</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.2}
          className="mt-7 max-w-[42ch] text-lg font-normal text-gray-600 sm:text-xl"
        >
          รวมผลงานออกแบบสถาปัตยกรรม ก่อสร้าง รีโนเวท บิ้วอิน และงานโครงสร้าง
        </motion.p>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.3}
          className="mt-4 max-w-[46ch] text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400"
        >
          Architectural Design • Construction • Renovation • Built-in
        </motion.p>

        <div className="h-1.5 w-24 bg-[#5A716A] my-8 rounded-full"></div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.4}
          className="flex flex-col items-start gap-4 sm:flex-row sm:items-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-patina-deep"
          >
            Start a Project
            <ArrowRight size={15} strokeWidth={1.75} />
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-7 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-gray-900 transition-colors hover:border-gray-900 hover:bg-gray-50"
          >
            View Portfolio
          </a>
        </motion.div>

        <motion.a
          href="#services"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="group mt-12 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-gray-500 transition-colors hover:text-gray-900"
        >
          Scroll to explore
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={16} strokeWidth={1.5} />
          </motion.span>
        </motion.a>
      </div>

      <div className="order-1 h-[45vh] w-full lg:order-2 lg:h-full">
        <img
          src="/ช่องสามหมอ.jpg"
          alt="Modern two-storey residential exterior rendering by Phoomrapee"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
          className="h-full w-full rounded-none object-cover object-center select-none"
        />
      </div>
    </section>
  )
}
