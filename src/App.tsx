import React, { lazy, Suspense } from 'react'
import { useAuth } from 'context/auth-context'
import { FullPageErrorFeedback, FullPageLoading } from './components/common/lib'
import { ErrorBoundary } from './components/common/error-boundary'
import 'App.css'

const AuthenticatedApp = lazy(
  () => import('./authenticated-app/authenticated-app'),
)
const UnAuthenticatedApp = lazy(() => import('./unauthenticated-app/index'))

function App() {
  const { user } = useAuth()
  return (
    <div className='App'>
      <ErrorBoundary fallbackRender={FullPageErrorFeedback}>
        <Suspense fallback={<FullPageLoading />}>
          {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default App
