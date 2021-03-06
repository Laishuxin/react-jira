import React from 'react'
import { AuthProvider } from './auth-context'
import { QueryClient, QueryClientProvider } from 'react-query'

export const AppAuthProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              refetchOnWindowFocus: false,
            },
          },
        })
      }
    >
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  )
}
