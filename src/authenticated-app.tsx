import { useAuth } from 'context/auth-context'
import React from 'react'
import { ProjectScreen } from 'screens/project-list'

export const AuthenticatedApp = () => {
  const { logout } = useAuth()
  return (
    <div className={'screen'}>
      <ProjectScreen />
      <button onClick={logout}>logout</button>
    </div>
  )
}
