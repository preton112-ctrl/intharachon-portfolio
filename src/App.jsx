import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import CategoryView from './components/CategoryView'
import ExperienceSkills from './components/ExperienceSkills'
import FeaturedWorks from './components/FeaturedWorks'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import ProjectDetail from './components/ProjectDetail'
import Services from './components/Services'
import { useNavigateTo } from './hooks/useNavigateTo'

function Layout() {
  const navigateTo = useNavigateTo()

  return (
    <>
      <Navbar navigateTo={navigateTo} />
      <Outlet />
      <Footer />
    </>
  )
}

function MainApp() {
  const location = useLocation()
  const navigateTo = useNavigateTo()
  const viewState = location.state ?? { page: 'home', category: '', subCategory: '' }

  return (
    <>
      {viewState.page === 'home' && (
        <main>
          <Hero />
          <Services navigateTo={navigateTo} />
          <FeaturedWorks />
          <ExperienceSkills />
        </main>
      )}

      {viewState.page === 'category' && (
        <CategoryView category={viewState.category} subCategory={viewState.subCategory} navigateTo={navigateTo} />
      )}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainApp />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
