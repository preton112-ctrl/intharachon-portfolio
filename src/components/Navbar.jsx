import { AnimatePresence, motion } from 'framer-motion'
import {
  Building2,
  Check,
  ChevronDown,
  FileText,
  Globe,
  GraduationCap,
  Home as HomeIcon,
  Menu,
  Sofa,
  Wrench,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Work Experience', href: '#experience' },
  { label: 'Hard Skills', href: '#skills' },
]

const LANGUAGES = [
  { code: 'TH', flag: 'https://flagcdn.com/w20/th.png', label: 'TH - ภาษาไทย' },
  { code: 'EN', flag: 'https://flagcdn.com/w20/gb.png', label: 'EN - English' },
  { code: 'ZH', flag: 'https://flagcdn.com/w20/cn.png', label: 'ZH - 中文' },
]

const PORTFOLIO_MEGA_MENU = [
  {
    icon: HomeIcon,
    title: 'Architectural Design',
    href: '#portfolio',
    children: [
      { en: 'Single-Storey Buildings', th: 'อาคารชั้นเดียว' },
      { en: '1.5-Storey Buildings', th: 'อาคารชั้นครึ่ง' },
      { en: 'Two-Storey Buildings', th: 'อาคารสองชั้น' },
      { en: 'Three-Storey Buildings', th: 'อาคารสามชั้น' },
    ],
  },
  {
    icon: Sofa,
    title: 'Interior & Built-in',
    href: '#portfolio',
    children: [],
  },
  {
    icon: Building2,
    title: 'Construction Management',
    href: '#portfolio',
    children: [],
  },
  {
    icon: Wrench,
    title: 'Building Renovation',
    href: '#portfolio',
    children: [],
  },
  {
    icon: FileText,
    title: 'Drafting & Documentation',
    href: '#portfolio',
    children: [],
  },
  {
    icon: GraduationCap,
    title: 'Academic Projects',
    href: '#portfolio',
    children: [],
  },
]

export default function Navbar({ navigateTo }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMegaOpen, setIsMegaOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [lang, setLang] = useState('TH')
  const langRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  useEffect(() => {
    const onClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-19 max-w-7xl items-center justify-between px-6 lg:px-10">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            navigateTo('home')
          }}
          aria-label="Phoomrapee, Architect — back to top"
          className="font-display text-lg font-bold tracking-tight text-gray-900"
        >
          PHOOMRAPEE <span className="text-patina">| ARCHITECT</span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={
                link.label === 'Home'
                  ? (e) => {
                      e.preventDefault()
                      navigateTo('home')
                    }
                  : undefined
              }
              className="group relative py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-gray-900"
            >
              {link.label}
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setIsMegaOpen(true)}
            onMouseLeave={() => setIsMegaOpen(false)}
          >
            <a
              href="#portfolio"
              className="group relative py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-gray-900"
            >
              Portfolio
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>

            <AnimatePresence>
              {isMegaOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
                  className="absolute top-full left-1/2 mt-4 w-[680px] -translate-x-1/2 rounded-2xl border border-gray-100 bg-white p-8 shadow-2xl"
                >
                  <div className="grid grid-cols-3 gap-x-8 gap-y-8">
                    {PORTFOLIO_MEGA_MENU.map(({ icon: Icon, title, href, children }) => (
                      <div key={title}>
                        <a
                          href={href}
                          onClick={(e) => {
                            e.preventDefault()
                            navigateTo('category', title, 'All')
                            setIsMegaOpen(false)
                          }}
                          className="group/item flex flex-col items-start gap-3"
                        >
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-50 text-patina transition-colors group-hover/item:bg-patina group-hover/item:text-white">
                            <Icon size={18} strokeWidth={1.5} />
                          </span>
                          <span className="text-sm font-semibold text-gray-900">{title}</span>
                        </a>
                        {children.length > 0 && (
                          <ul className="mt-3 space-y-3 border-l border-gray-100 pl-3">
                            {children.map((child) => {
                              return (
                                <li key={child.en}>
                                  <a
                                    href={href}
                                    onClick={(e) => {
                                      e.preventDefault()
                                      navigateTo('category', title, child.en)
                                      setIsMegaOpen(false)
                                    }}
                                    className="block text-xs text-gray-700 transition-colors hover:text-patina"
                                  >
                                    {child.en}
                                    <span className="mt-1 block text-sm font-normal text-gray-500">
                                      {child.th}
                                    </span>
                                  </a>
                                </li>
                              )
                            })}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setIsLangOpen((open) => !open)}
              aria-expanded={isLangOpen}
              className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em] text-gray-900"
            >
              <Globe size={16} strokeWidth={1.5} />
              {lang}
              <ChevronDown
                size={14}
                strokeWidth={1.75}
                className={`transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
                  className="absolute top-full right-0 mt-4 w-48 rounded-xl border border-gray-100 bg-white p-2 shadow-2xl"
                >
                  {LANGUAGES.map(({ code, flag, label }) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => {
                        setLang(code)
                        setIsLangOpen(false)
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors hover:bg-zinc-50 ${
                        lang === code ? 'font-semibold text-patina' : 'text-gray-700'
                      }`}
                    >
                      <span className="flex items-center">
                        <img src={flag} alt={code} className="mr-2 inline-block h-3 w-4" />
                        {label}
                      </span>
                      {lang === code && <Check size={14} strokeWidth={2} className="text-patina" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href="#contact"
            className="rounded-full bg-ink px-5 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-patina-deep"
          >
            Contact
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="-mr-2 flex h-11 w-11 items-center justify-center text-gray-900 md:hidden"
        >
          {isMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            aria-label="Mobile"
            className="overflow-hidden border-t border-gray-200 bg-white/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col px-6 py-2">
              {[...NAV_LINKS, { label: 'Portfolio', href: '#portfolio' }].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    if (link.label === 'Home') {
                      e.preventDefault()
                      navigateTo('home')
                    }
                    setIsMenuOpen(false)
                  }}
                  className="border-b border-gray-200 py-4 text-sm font-medium uppercase tracking-[0.16em] text-gray-900 last:border-0"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="my-4 rounded-full bg-ink px-5 py-3 text-center text-xs font-medium uppercase tracking-[0.16em] text-white"
              >
                Contact
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
