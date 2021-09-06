import React from 'react'
import { AuthenticatedApp } from 'authenticated-app'
import { useAuth } from 'context/auth-context'
import { BrowserRouter as Router } from 'react-router-dom'
import { UnAuthenticatedApp } from 'unauthenticated-app'
import 'App.css'
import { FullPageErrorFeedback } from './components/common/lib'
import { ErrorBoundary } from './components/common/error-boundary'
import { AppAuthProvider } from 'context'

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
