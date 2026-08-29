import { motion } from 'framer-motion'
import { Download, GraduationCap, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

const CONTACT_ITEMS = [
  { icon: Phone, label: '092-481-3802', href: 'tel:0924813802' },
  { icon: Mail, label: 'Preton112@Gmail.com', href: 'mailto:Preton112@Gmail.com' },
  { icon: MessageCircle, label: 'LINE: phoomrpee112', href: undefined },
  { icon: MapPin, label: 'Chaiyaphum, Thailand', href: undefined },
]

const EDUCATION = [
  {
    school: 'Khon Kaen University',
    period: '2025–Present',
    detail: "Master's in Energy and Environment (First-class honors track)",
  },
  {
    school: 'Rangsit University',
    period: '2019–2024',
    detail: "Bachelor's in Architecture (Second-class honors), GPA 3.46",
  },
]

const LANGUAGES = ['Thai (Native)', 'English (Professional)']

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 0.61, 0.36, 1] },
  }),
}

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0a0f1c] py-20 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.26em] text-patina-tint">
              Profile &amp; Contact
            </p>
            <h3 className="font-display text-2xl font-bold tracking-tight text-white">
              Phoomrapee Intharaphoom
            </h3>
            <ul className="mt-6 space-y-3">
              {CONTACT_ITEMS.map(({ icon: Icon, label, href }) => (
                <li key={label} className="flex items-center gap-3 text-sm text-gray-400">
                  <Icon size={16} strokeWidth={1.5} className="shrink-0 text-patina-tint" />
                  {href ? (
                    <a href={href} className="transition-colors hover:text-white">
                      {label}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            custom={0.1}
          >
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.26em] text-patina-tint">
              Education
            </p>
            <ul className="space-y-6">
              {EDUCATION.map(({ school, period, detail }) => (
                <li key={school} className="flex gap-3">
                  <GraduationCap size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-patina-tint" />
                  <div>
                    <p className="text-sm font-semibold text-white">{school}</p>
                    <p className="mt-0.5 text-xs text-gray-500">{period}</p>
                    <p className="mt-1.5 text-sm text-gray-400">{detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            custom={0.2}
          >
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.26em] text-patina-tint">
              Languages &amp; Resume
            </p>
            <ul className="space-y-2">
              {LANGUAGES.map((language) => (
                <li key={language} className="text-sm text-gray-400">
                  {language}
                </li>
              ))}
            </ul>

            <a
              href="/phoomrapee-resume.docx"
              download
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-patina-tint/50 px-6 py-3 text-xs font-medium uppercase tracking-[0.16em] text-white shadow-[0_0_24px_rgba(143,168,161,0.35)] transition-colors hover:bg-patina-tint/10"
            >
              <Download size={15} strokeWidth={1.75} />
              Download Full Resume
            </a>
          </motion.div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Phoomrapee Intharaphoom. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
