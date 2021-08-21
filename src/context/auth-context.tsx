import React, { createContext, useState, useContext } from 'react'
import { IAuthForm, IRegisterForm, IUser } from 'types'
import * as auth from 'api/auth-provider'
import { http } from 'api/http'
import { useMount } from 'shared/hooks'

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
  const [user, setUser] = useState<IUser | null>(null)

  useMount(() => {
    bootstrapUser().then(setUser)
  })

  const login = (authForm: IAuthForm) => auth.fetchLogin(authForm).then(setUser)
  const register = (authForm: IAuthForm) =>
    auth.fetchRegister(authForm).then(setUser)
  const logout = () => auth.fetchLogout().then(() => setUser(null))

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
