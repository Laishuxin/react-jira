import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
export const useNavigateToOrigin = () => {
  const navigate = useNavigate()
  return useCallback(() => navigate('/'), [navigate])
}
