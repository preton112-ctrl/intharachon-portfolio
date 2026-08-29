import { useState } from 'react'
import CategoryView from './components/CategoryView'
import ExperienceSkills from './components/ExperienceSkills'
import FeaturedWorks from './components/FeaturedWorks'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Services from './components/Services'

function App() {
  const [viewState, setViewState] = useState({ page: 'home', category: '', subCategory: '' })

  const navigateTo = (page, category = '', subCategory = '') => {
    setViewState({ page, category, subCategory })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Navbar navigateTo={navigateTo} />

      {viewState.page === 'home' && (
        <>
          <main>
            <Hero />
            <Services navigateTo={navigateTo} />
            <FeaturedWorks />
            <ExperienceSkills />
          </main>
          <Footer />
        </>
      )}

      {viewState.page === 'category' && (
        <>
          <CategoryView
            category={viewState.category}
            subCategory={viewState.subCategory}
            navigateTo={navigateTo}
          />
          <Footer />
        </>
      )}
    </>
  )
}

export default App
