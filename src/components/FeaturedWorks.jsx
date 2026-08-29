import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const WORKS = [
  { title: 'Twilight Facade Study', image: '/ช่องสามหมอ.jpg' },
  { title: 'Modern Family Residence', image: '/บ้านฝรั่ง.jpg' },
  { title: 'Courtyard House Renovation', image: '/v1.jpg' },
  { title: 'Contemporary Retreat', image: '/ai render 25.jpg' },
  { title: 'Stone Facade Estate', image: '/ai render 24.jpg' },
  { title: 'Cafe Facade Study', image: '/LINE_NOTE_260806_1.jpg' },
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
  const scrollerRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = () => {
    const el = scrollerRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 8)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
  }

  useEffect(() => {
    updateScrollState()
    window.addEventListener('resize', updateScrollState)
    return () => window.removeEventListener('resize', updateScrollState)
  }, [])

  const scrollByAmount = (direction) => {
    scrollerRef.current?.scrollBy({ left: direction * 600, behavior: 'smooth' })
  }

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
        className="relative mt-14"
      >
        <div
          ref={scrollerRef}
          onScroll={updateScrollState}
          className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 lg:px-10"
        >
          {WORKS.map(({ title, image }) => (
            <div
              key={title}
              className="aspect-video w-[80vw] shrink-0 snap-center overflow-hidden rounded-2xl lg:w-[60vw]"
            >
              <img
                src={image}
                alt={title}
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                className="h-full w-full rounded-2xl object-cover select-none"
              />
            </div>
          ))}
        </div>

        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scrollByAmount(-1)}
            aria-label="Scroll gallery left"
            className="absolute top-1/2 left-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg transition-colors hover:bg-gray-50 lg:left-8"
          >
            <ChevronLeft size={20} strokeWidth={1.75} />
          </button>
        )}

        {canScrollRight && (
          <button
            type="button"
            onClick={() => scrollByAmount(1)}
            aria-label="Scroll gallery right"
            className="absolute top-1/2 right-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg transition-colors hover:bg-gray-50 lg:right-8"
          >
            <ChevronRight size={20} strokeWidth={1.75} />
          </button>
        )}
      </motion.div>
    </section>
  )
}
