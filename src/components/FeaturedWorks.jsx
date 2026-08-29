import { motion } from 'framer-motion'
import HorizontalGallery from './HorizontalGallery'

const WORKS = [
  { key: 'Twilight Facade Study', image: '/ช่องสามหมอ.jpg', alt: 'Twilight Facade Study' },
  { key: 'Modern Family Residence', image: '/บ้านฝรั่ง.jpg', alt: 'Modern Family Residence' },
  { key: 'Courtyard House Renovation', image: '/v1.jpg', alt: 'Courtyard House Renovation' },
  { key: 'Contemporary Retreat', image: '/ai render 25.jpg', alt: 'Contemporary Retreat' },
  { key: 'Stone Facade Estate', image: '/ai render 24.jpg', alt: 'Stone Facade Estate' },
  { key: 'Cafe Facade Study', image: '/LINE_NOTE_260806_1.jpg', alt: 'Cafe Facade Study' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 0.61, 0.36, 1] },
  }),
}

export default function FeaturedWorks() {
  return (
    <section id="portfolio" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-4 text-[11px] font-medium uppercase tracking-[0.26em] text-patina"
        >
          Featured Works
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          custom={0.1}
          className="font-display max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
        >
          A Closer Look at Recent Builds
        </motion.h2>
        <div className="h-1.5 w-24 bg-[#5A716A] mt-4 rounded-full"></div>
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        custom={0.2}
        className="mt-14"
      >
        <HorizontalGallery items={WORKS} />
      </motion.div>
    </section>
  )
}
