import { IAuthForm, IRegisterForm } from 'types/form'
import { IUser } from 'types/user'
import { http } from './http'
const localStorageKey = '__auth__provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({ user }: { user: IUser }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const fetchLogin = (data: IAuthForm) => {
  return http('/login', { method: 'POST', data }).then(response =>
    handleUserResponse(response),
  )
}

export const fetchRegister = (data: IRegisterForm) => {
  return http('/register', { method: 'POST', data }).then(response =>
    handleUserResponse(response),
  )
}

export const fetchLogout = async () =>
  window.localStorage.removeItem(localStorageKey)
