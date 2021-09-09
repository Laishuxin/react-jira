import React from 'react'
import { AuthenticatedApp } from 'authenticated-app/authenticated-app'
import { useAuth } from 'context/auth-context'
import { UnAuthenticatedApp } from 'unauthenticated-app'
import { FullPageErrorFeedback } from './components/common/lib'
import { ErrorBoundary } from './components/common/error-boundary'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ROUTER_PREFIX } from 'config'
import 'App.css'

function App() {
  const { user } = useAuth()
  const Main = user ? <AuthenticatedApp /> : <UnAuthenticatedApp />
  return (
    <div className='App'>
      <ErrorBoundary fallbackRender={FullPageErrorFeedback}>
        <Routes>
          <Route path={ROUTER_PREFIX + '/*'} element={Main} />
          <Navigate to={ROUTER_PREFIX} />
        </Routes>
      </ErrorBoundary>
    </div>
  )
}

export default App
