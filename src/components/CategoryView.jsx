import { ArrowLeft } from 'lucide-react'

const portfolioData = {
  'Architectural Design': {
    'Single-Storey Buildings (อาคารชั้นเดียว)': [
      {
        id: 1,
        title: 'Modern Courtyard Bungalow',
        location: 'Chaiyaphum, Thailand',
        thumbnail: '/บ้านฝรั่ง.jpg',
        description: 'A single-storey residence built around a shaded central courtyard.',
      },
      {
        id: 2,
        title: 'Timber-Slat Garden House',
        location: 'Kaeng Khro, Chaiyaphum',
        thumbnail: '/ai render 20.jpg',
        description: 'Warm timber accents against a minimalist white facade at dusk.',
      },
      {
        id: 3,
        title: 'Roadside Family Residence',
        location: 'Chaiyaphum, Thailand',
        thumbnail: '/v1.jpg',
        description: 'A compact single-level home designed for a narrow street-facing lot.',
      },
      {
        id: 4,
        title: 'Twilight Facade Study',
        location: 'Chong Sam Mo, Chaiyaphum',
        thumbnail: '/ช่องสามหมอ.jpg',
        description: 'Daylight and material study for a single-storey courtyard concept.',
      },
    ],
    '1.5-Storey Buildings (อาคารชั้นครึ่ง)': [
      {
        id: 1,
        title: 'Loft-Roof Garden Residence',
        location: 'Chaiyaphum, Thailand',
        thumbnail: '/ren1.jpg',
        description: 'A single-storey plan with a raised loft level tucked beneath the roof.',
      },
    ],
    'Two-Storey Buildings (อาคารสองชั้น)': [
      {
        id: 1,
        title: 'Stone & Render Estate',
        location: 'Chaiyaphum, Thailand',
        thumbnail: '/ai render 24.jpg',
        description: 'A gated two-storey home combining natural stone cladding with render.',
      },
      {
        id: 2,
        title: 'Contemporary Family Retreat',
        location: 'Chaiyaphum, Thailand',
        thumbnail: '/ai render 25.jpg',
        description: 'Twin gable roofs over a warm, family-oriented two-storey layout.',
      },
      {
        id: 3,
        title: 'Cafe & Residence Facade',
        location: 'Chaiyaphum, Thailand',
        thumbnail: '/LINE_NOTE_260806_1.jpg',
        description: 'Mixed-use ground-floor cafe with private living quarters above.',
      },
    ],
    'Three-Storey Buildings (อาคารสามชั้น)': [
      {
        id: 1,
        title: 'Vertical Urban Residence',
        location: 'Chaiyaphum, Thailand',
        thumbnail: '/ai render 18.jpg',
        description: 'A three-storey home concept for a compact urban infill site.',
      },
    ],
  },
  'Interior & Built-in': [],
  'Construction Management': [],
  'Building Renovation': [],
  'Drafting & Documentation': [],
  'Academic Projects': [],
}

export default function CategoryView({ category, subCategory, navigateTo }) {
  const categoryData = portfolioData[category] ?? {}
  const projects =
    subCategory === 'All' ? Object.values(categoryData).flat() : (categoryData[subCategory] ?? [])

  const heading = `${category} - All Projects`
  const isArchitecturalDesign = category === 'Architectural Design'
  const tabs = isArchitecturalDesign ? ['All', ...Object.keys(categoryData)] : []

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

        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.26em] text-patina">
          {category}
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {heading}
        </h1>

        {isArchitecturalDesign && tabs.length > 1 && (
          <div className="hide-scrollbar mt-8 flex gap-3 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => navigateTo('category', category, tab)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium whitespace-nowrap transition-colors ${
                  subCategory === tab
                    ? 'bg-slate-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={`${project.title}-${index}`}
              className="group cursor-pointer transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-xl">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  className="h-full w-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{project.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{project.location}</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{project.description}</p>
              <button
                type="button"
                className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-patina transition-colors hover:text-patina-deep"
              >
                View Project →
              </button>
            </div>
          ))}

          {projects.length === 0 && (
            <p className="text-sm text-gray-500">More projects for this category are coming soon.</p>
          )}
        </div>
      </div>
    </section>
  )
}
