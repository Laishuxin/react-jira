import React, { createContext, useState, useContext } from 'react'
import { IAuthForm, IRegisterForm, IUser } from 'types'
import * as auth from 'api/auth-provider'

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

  const login = (authForm: IAuthForm) => auth.login(authForm).then(setUser)
  const register = (authForm: IAuthForm) =>
    auth.register(authForm).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))

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
