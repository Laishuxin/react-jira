import React from 'react'
import { AuthenticatedApp } from 'authenticated-app'
import { useAuth } from 'context/auth-context'
import { BrowserRouter as Router } from 'react-router-dom'
import { UnAuthenticatedApp } from 'unauthenticated-app'
import 'App.css'
import { FullPageErrorFeedback } from './components/common/lib'
import { ErrorBoundary } from './components/common/ErrorBoundary'

function App() {
  const { user } = useAuth()
  return (
    <div className='App'>
      <ErrorBoundary fallbackRender={FullPageErrorFeedback}>
        <Router>{user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}</Router>
      </ErrorBoundary>
    </div>
  )
}

export default App
