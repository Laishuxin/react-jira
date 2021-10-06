import React, { createContext, useContext, useEffect } from 'react'
// TODO(rushui 2021-09-30): 重构
import { useAsync } from 'hooks/use-async'
import { LoginForm, RegisterForm } from 'typings/auth'
import { User } from 'typings/user'
import * as auth from 'api/auth'
import { http } from 'api/http'
import {
  FullCenterContainer,
  FullScreenLoading,
} from 'components/common/containers'
import { ErrorText } from 'components/common/text'
import { DevTools } from 'jira-dev-tool'

export interface AuthContext {
  login: (form: LoginForm) => Promise<User>
  register: (form: RegisterForm) => Promise<User>
  user: User | null
  logout: () => Promise<void>
}

export interface AuthProviderProps {
  children: React.ReactNode
}

const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http<{ user: User }>('/me', { token })
    user = data.user
  }
  return user
}

const authContext = createContext<AuthContext | null>(null)
authContext.displayName = 'auth-context'

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const {
    data: user,
    setData: setUser,
    isError,
    isLoading,
    run,
    error,
  } = useAsync<User | null>()
  useEffect(() => {
    run(bootstrapUser())
  }, [run])
  const login = (form: LoginForm) =>
    auth.fetchLogin(form).then(user => {
      setUser(user)
      return user
    })

  const register = (form: RegisterForm) =>
    auth.fetchRegister(form).then(user => {
      setUser(user)
      return user
    })

  // TODO(rushui 2021-09-30): 返回首页
  const logout = () => auth.fetchLogout().then(() => setUser(null))

  if (isLoading) {
    return <FullScreenLoading />
  }

  if (isError) {
    return (
      <FullCenterContainer>
        <DevTools />
        <ErrorText error={error} />
      </FullCenterContainer>
    )
  }

  return (
    <authContext.Provider
      value={{
        user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </authContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(authContext)
  if (!context) {
    throw new Error('Auth context must be used inside AuthProvider')
  }
  return context
}
