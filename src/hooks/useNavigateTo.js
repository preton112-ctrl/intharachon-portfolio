import { useNavigate } from 'react-router-dom'

export function useNavigateTo() {
  const navigate = useNavigate()

  return (page, category = '', subCategory = '') => {
    navigate('/', { state: { page, category, subCategory } })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
