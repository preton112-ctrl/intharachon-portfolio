import { motion } from 'framer-motion'
import {
  Building2,
  FileText,
  GraduationCap,
  HardHat,
  PenTool,
  Sofa,
  Wrench,
} from 'lucide-react'

const CATEGORIES = [
  {
    icon: PenTool,
    title: 'Architectural Design',
    description: 'Drafting, 3D visualization, and lighting simulation.',
  },
  {
    icon: Sofa,
    title: 'Interior & Built-in',
    description: 'Custom interior spaces and detailed built-in furniture.',
  },
  {
    icon: Wrench,
    title: 'Building Renovation',
    description: 'Complete space transformation, from structure to finish.',
  },
  {
    icon: HardHat,
    title: 'Construction Management',
    description: 'End-to-end oversight from ground-breaking to handover.',
  },
  {
    icon: FileText,
    title: 'Drafting & Documentation',
    description: 'Precise construction drawings and permit documentation.',
  },
  {
    icon: GraduationCap,
    title: 'Academic Projects',
    description: 'Thesis-level design studies and research collaborations.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 0.61, 0.36, 1] },
  }),
}

export default function Services({ navigateTo }) {
  return (
    <section id="services" className="bg-gradient-to-b from-slate-900 to-black py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-4 text-[11px] font-medium uppercase tracking-[0.26em] text-patina-tint"
        >
          Our Expertise
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          custom={0.1}
          className="font-display max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl"
        >
          Comprehensive Design &amp; Build Solutions
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              custom={0.1 + 0.08 * index}
              onClick={() => navigateTo('category', title, 'All')}
              className="group cursor-pointer rounded-xl border border-white/10 p-8 transition-colors duration-300 hover:bg-white/5"
            >
              <Icon
                size={26}
                strokeWidth={1.5}
                className="text-patina-tint transition-transform duration-300 group-hover:scale-110"
              />
              <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
