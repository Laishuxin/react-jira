import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const useCleanSearchParams = () => {
  const location = useLocation()
  const navigate = useNavigate()
  return useCallback(
    () => navigate(location.pathname),
    [location.pathname, navigate],
  )
}
