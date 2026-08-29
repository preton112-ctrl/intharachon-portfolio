import { motion } from 'framer-motion'

const EXPERIENCE = [
  {
    role: 'Freelance Architect & Contractor',
    period: 'Current',
    description: 'Architectural Design, Drafting, Construction, and Project Consultation.',
  },
  {
    role: 'Architectural Designer @ PDa House & Solution',
    period: 'Previous',
    description: 'Residential architectural design and project development in Chaiyaphum.',
  },
  {
    role: 'Architectural Draftsman @ Syntec Construction PCL.',
    period: 'Internship',
    description: 'Professional drafting.',
  },
]

const SKILLS = [
  { name: 'SketchUp & 3D Modeling', value: 95 },
  { name: 'Construction Documentation', value: 85 },
  { name: 'Autodesk AutoCAD', value: 75 },
  { name: 'D5 Render', value: 70 },
  { name: 'Adobe Photoshop', value: 65 },
  { name: 'Microsoft Word', value: 65 },
  { name: 'AI Tools', value: 65 },
  { name: 'Microsoft Excel', value: 45 },
  { name: 'Rhino - Rhinoceros 3D', value: 35 },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 0.61, 0.36, 1] },
  }),
}

export default function ExperienceSkills() {
  return (
    <section id="experience-skills" className="bg-white py-24">
      <div className="container mx-auto grid grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:px-10">
        <div id="experience">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-4 text-[11px] font-medium uppercase tracking-[0.26em] text-patina"
          >
            Work Experience
          </motion.p>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            custom={0.1}
            className="font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            From Concept to Construction
          </motion.h2>

          <div className="mt-12 border-l-2 border-gray-200 pl-8">
            {EXPERIENCE.map(({ role, period, description }, index) => (
              <motion.div
                key={role}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                custom={0.15 + 0.1 * index}
                className="relative pb-10 last:pb-0"
              >
                <span className="absolute top-1.5 -left-[calc(2rem+5px)] h-2.5 w-2.5 rounded-full bg-patina" />
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-400">
                  {period}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-gray-900">{role}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div id="skills">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-4 text-[11px] font-medium uppercase tracking-[0.26em] text-patina"
          >
            Hard Skills & Tools
          </motion.p>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            custom={0.1}
            className="font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Precision Tools, Practiced Craft
          </motion.h2>

          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
            {SKILLS.map(({ name, value }, index) => (
              <motion.div
                key={name}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                custom={0.1 + 0.05 * index}
              >
                <div className="mb-1.5 flex items-baseline justify-between">
                  <span className="text-sm font-medium text-gray-900">{name}</span>
                  <span className="text-sm text-gray-400">{value}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${value}%` }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 1, delay: 0.15 + 0.05 * index, ease: [0.22, 0.61, 0.36, 1] }}
                    className="h-full rounded-full bg-patina"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
