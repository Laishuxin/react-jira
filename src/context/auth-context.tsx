import React, { createContext, useContext } from 'react'
import * as auth from 'api/auth'
import { http } from 'api/http'
import { useMount } from 'shared/hooks/use-mount'
import { IUser } from 'types/user'
import { IAuthForm, IRegisterForm } from 'types/form'
import { useAsync } from '../shared/hooks/use-async'
import {
  FullPageErrorFeedback,
  FullPageLoading,
} from '../components/common/lib'
import { useNavigateToOrigin } from 'shared/hooks/use-navigate'
import { useQueryClient } from 'react-query'

const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('/me', { token })
    user = data.user
  }
  return user
}

const AuthContext = createContext<
  | {
      user: IUser | null
      login: (authForm: IAuthForm) => Promise<void>
      register: (form: IRegisterForm) => Promise<void>
      logout: () => Promise<void>
    }
  | undefined
>(undefined)

AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigateToOrigin = useNavigateToOrigin()
  const {
    data: user,
    setData: setUser,
    isError,
    isLoading,
    isIdle,
    run,
    error,
  } = useAsync<IUser | null>()
  useMount(() => {
    run(bootstrapUser())
  })

  const login = (authForm: IAuthForm) => auth.fetchLogin(authForm).then(setUser)
  const register = (authForm: IAuthForm) =>
    auth.fetchRegister(authForm).then(setUser)
  const queryClient = useQueryClient()
  const logout = () =>
    auth.fetchLogout().then(() => {
      setUser(null)
      navigateToOrigin()
      queryClient.clear()
    })

  if (isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageErrorFeedback error={error as Error} />
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ login, register, logout, user }}
    />
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.')
  }
  return context
}
