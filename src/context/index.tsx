import React from 'react'
import { AuthProvider } from './auth-context'

export const AppAuthProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <AuthProvider>{children}</AuthProvider>
}
