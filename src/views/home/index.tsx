import React, { Fragment } from 'react'
import { useAuthContext } from 'context/auth-context'
import { UnauthenticatedApp } from './unauthenticated-app'
import { AuthenticatedApp } from './authenticated-app'

export const Home = () => {
  const { user } = useAuthContext()
  return (
    <Fragment>{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</Fragment>
  )
}
