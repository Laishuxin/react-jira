import React from 'react'
import { AuthenticatedApp } from 'authenticated-app/authenticated-app'
import { useAuth } from 'context/auth-context'
import { UnAuthenticatedApp } from 'unauthenticated-app'
import { FullPageErrorFeedback } from './components/common/lib'
import { ErrorBoundary } from './components/common/error-boundary'
import 'App.css'

function App() {
  const { user } = useAuth()
  return (
    <div className='App'>
      <ErrorBoundary fallbackRender={FullPageErrorFeedback}>
        {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
      </ErrorBoundary>
    </div>
  )
}

export default App
