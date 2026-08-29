import { motion } from 'framer-motion'
import { ArrowLeft, Bath, BedDouble, Car, Check, CookingPot, Sofa } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ARCHITECTURAL_SUB_CATEGORIES } from '../constants'
import { useNavigateTo } from '../hooks/useNavigateTo'
import Lightbox from './Lightbox'
import { sanityClient, urlFor } from '../sanityClient'

const PROJECT_QUERY = `*[_type == "project" && slug.current == $slug][0]{
  title,
  description,
  category,
  bedrooms,
  bathrooms,
  livingRooms,
  kitchens,
  parking,
  additionalFunctions,
  mainImage,
  gallery,
  "related": *[_type == "project" && slug.current != $slug] | order(_createdAt desc)[0...5]{
    title,
    "slug": slug.current,
    mainImage
  }
}`

const SPECS = [
  { key: 'bedrooms', icon: BedDouble, label: (value) => `${value} ห้องนอน` },
  { key: 'bathrooms', icon: Bath, label: (value) => `${value} ห้องน้ำ` },
  { key: 'livingRooms', icon: Sofa, label: (value) => `${value} ห้องรับแขก` },
  { key: 'kitchens', icon: CookingPot, label: (value) => `${value} ห้องครัว` },
  { key: 'parking', icon: Car, label: (value) => `${value} โรงจอดรถ` },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 0.61, 0.36, 1] },
  }),
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const navigateTo = useNavigateTo()
  const [project, setProject] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    sanityClient
      .fetch(PROJECT_QUERY, { slug })
      .then((data) => setProject(data))
      .catch((error) => {
        console.error('[ProjectDetail] Failed to fetch project from Sanity:', error)
        setProject(null)
      })
      .finally(() => setIsLoading(false))
  }, [slug])

  const handleBack = () => {
    if (!project?.category) {
      navigateTo('home')
      return
    }

    if (ARCHITECTURAL_SUB_CATEGORIES.includes(project.category)) {
      navigateTo('category', 'Architectural Design', project.category)
    } else {
      navigateTo('category', project.category, 'All')
    }
  }

  const backLabel = project?.category ? `Back to ${project.category}` : 'Back to Portfolio'

  // [mainImage, ...gallery] so the Lightbox can page through every image in
  // the project, including looping back to the cover shot.
  const allImages = []
  if (project?.mainImage) {
    allImages.push({ src: urlFor(project.mainImage).width(2400).url(), alt: project.title })
  }
  project?.gallery?.forEach((image, i) => {
    allImages.push({
      src: urlFor(image).width(2400).url(),
      alt: `${project.title} — gallery ${i + 1}`,
    })
  })
  const galleryStartIndex = project?.mainImage ? 1 : 0

  const relatedItems =
    project?.related
      ?.filter((item) => item.mainImage)
      .map((item) => ({
        key: item.slug,
        image: urlFor(item.mainImage).width(600).height(450).fit('crop').url(),
        title: item.title,
        to: `/project/${item.slug}`,
      })) ?? []

  return (
    <section className="min-h-screen bg-white pt-19">
      <div className="mx-auto max-w-5xl px-6 py-16 lg:px-10">
        <button
          type="button"
          onClick={handleBack}
          className="mb-10 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-gray-500 transition-colors hover:text-gray-900"
        >
          <ArrowLeft size={14} strokeWidth={1.75} />
          {backLabel}
        </button>

        {isLoading && <p className="text-sm text-gray-500">Loading project…</p>}

        {!isLoading && !project && (
          <p className="text-sm text-gray-500">This project could not be found.</p>
        )}

        {!isLoading && project && (
          <>
            {project.mainImage && (
              <div className="aspect-video w-full overflow-hidden rounded-2xl bg-gray-100">
                <img
                  src={urlFor(project.mainImage).width(1600).height(900).fit('crop').url()}
                  alt={project.title}
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  className="h-full w-full object-cover select-none"
                />
              </div>
            )}

            <h1 className="font-display mt-10 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {project.title}
            </h1>

            {SPECS.some(({ key }) => project[key] > 0) && (
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                {SPECS.map(({ key, icon: Icon, label }) => {
                  const value = project[key]
                  if (!(value > 0)) return null
                  return (
                    <div key={key} className="flex items-center gap-2 text-sm text-gray-600">
                      <Icon size={18} strokeWidth={1.5} className="text-patina" />
                      <span>{label(value)}</span>
                    </div>
                  )
                })}
              </div>
            )}

            {project.additionalFunctions?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.additionalFunctions.map((item, index) => (
                  <span
                    key={`${item}-${index}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700"
                  >
                    <Check size={12} strokeWidth={2.5} className="text-patina" />
                    {item}
                  </span>
                ))}
              </div>
            )}

            {project.description && (
              <p className="mt-6 max-w-3xl text-base leading-relaxed whitespace-pre-line text-gray-600">
                {project.description}
              </p>
            )}

            {project.gallery?.length > 0 && (
              <div className="mt-14">
                <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.26em] text-patina">
                  Gallery
                </p>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {project.gallery.map((image, index) => (
                    <button
                      key={image._key ?? index}
                      type="button"
                      onClick={() => setLightboxIndex(galleryStartIndex + index)}
                      className="group block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-xl border-0 bg-gray-100 p-0"
                    >
                      <img
                        src={urlFor(image).width(900).height(675).fit('crop').url()}
                        alt={`${project.title} — gallery ${index + 1}`}
                        draggable="false"
                        onContextMenu={(e) => e.preventDefault()}
                        className="h-full w-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {!isLoading && relatedItems.length > 0 && (
        <div className="mt-8 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="mb-4 text-[11px] font-medium uppercase tracking-[0.26em] text-patina"
            >
              Related Projects
            </motion.p>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              custom={0.1}
              className="font-display max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              โปรเจกต์อื่นๆ ที่น่าสนใจ
            </motion.h2>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              custom={0.2}
              className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6"
            >
              {relatedItems.map((item) => (
                <Link key={item.key} to={item.to} className="group block">
                  <div className="aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()}
                      className="h-full w-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 truncate text-sm font-semibold text-gray-900">{item.title}</p>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      )}

      {lightboxIndex !== null && (
        <Lightbox images={allImages} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </section>
  )
}
