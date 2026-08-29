import { ArrowLeft } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ARCHITECTURAL_SUB_CATEGORIES } from '../constants'
import { sanityClient, urlFor } from '../sanityClient'

// Fetch every project once; category/sub-category filtering happens
// client-side in `filteredProjects` below so switching tabs is instant.
const ALL_PROJECTS_QUERY = `*[_type == "project"] | order(_createdAt desc) {
  title,
  category,
  "slug": slug.current,
  mainImage
}`

export default function CategoryView({ category, subCategory, navigateTo }) {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const isArchitecturalDesign = category === 'Architectural Design'
  const tabs = isArchitecturalDesign ? ['All', ...ARCHITECTURAL_SUB_CATEGORIES] : []
  const heading = `${category} - All Projects`

  useEffect(() => {
    setIsLoading(true)

    sanityClient
      .fetch(ALL_PROJECTS_QUERY)
      .then((data) => setProjects(data))
      .catch((error) => {
        console.error('[CategoryView] Failed to fetch projects from Sanity:', error)
        setProjects([])
      })
      .finally(() => setIsLoading(false))
  }, [])

  const filteredProjects = useMemo(() => {
    if (isArchitecturalDesign) {
      if (subCategory === 'All') {
        return projects.filter(
          (project) => project.category === category || ARCHITECTURAL_SUB_CATEGORIES.includes(project.category),
        )
      }
      return projects.filter((project) => project.category === subCategory)
    }
    return projects.filter((project) => project.category === category)
  }, [projects, category, subCategory, isArchitecturalDesign])

  return (
    <section className="min-h-screen bg-white pt-19">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="mb-10 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-gray-500 transition-colors hover:text-gray-900"
        >
          <ArrowLeft size={14} strokeWidth={1.75} />
          Back to Home
        </button>

        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.26em] text-patina">{category}</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{heading}</h1>

        {isArchitecturalDesign && (
          <div className="hide-scrollbar mt-8 flex gap-3 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => navigateTo('category', category, tab)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium whitespace-nowrap transition-colors ${
                  subCategory === tab ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {isLoading && <p className="text-sm text-gray-500">Loading projects…</p>}

          {!isLoading &&
            filteredProjects.map((project) => {
              const CardTag = project.slug ? Link : 'div'
              return (
                <CardTag
                  key={project.slug ?? project.title}
                  {...(project.slug ? { to: `/project/${project.slug}` } : {})}
                  className="group block cursor-pointer transition-transform duration-300 hover:-translate-y-2"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                    {project.mainImage && (
                      <img
                        src={urlFor(project.mainImage).width(800).height(600).fit('crop').url()}
                        alt={project.title}
                        draggable="false"
                        onContextMenu={(e) => e.preventDefault()}
                        className="h-full w-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{project.title}</h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-gray-500">
                    {project.category}
                  </p>
                  <span className="mt-3 inline-block text-xs font-medium uppercase tracking-[0.16em] text-patina transition-colors group-hover:text-patina-deep">
                    View Project →
                  </span>
                </CardTag>
              )
            })}

          {!isLoading && filteredProjects.length === 0 && (
            <p className="text-sm text-gray-500">More projects for this category are coming soon.</p>
          )}
        </div>
      </div>
    </section>
  )
}
