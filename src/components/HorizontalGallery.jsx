import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// Shared horizontal snap-scroll carousel. Used by the homepage "Featured Works"
// gallery and the Project Detail "Related Projects" slider so both share the
// exact same look, motion and arrow behaviour.
// items: [{ key, image, alt, title?, to? }] — `title` renders an optional
// bottom caption, `to` makes the card a real Link instead of a static card.
export default function HorizontalGallery({ items }) {
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
  }, [items])

  const scrollByAmount = (direction) => {
    scrollerRef.current?.scrollBy({ left: direction * 600, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        onScroll={updateScrollState}
        className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 lg:px-10"
      >
        {items.map((item) => {
          const CardTag = item.to ? Link : 'div'
          return (
            <CardTag
              key={item.key}
              {...(item.to ? { to: item.to } : {})}
              className="relative aspect-video w-[80vw] shrink-0 snap-center overflow-hidden rounded-2xl lg:w-[60vw]"
            >
              <img
                src={item.image}
                alt={item.alt}
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                className="h-full w-full rounded-2xl object-cover select-none"
              />
              {item.title && (
                <>
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <p className="absolute bottom-6 left-6 text-lg font-semibold text-white">{item.title}</p>
                </>
              )}
            </CardTag>
          )
        })}
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
    </div>
  )
}
