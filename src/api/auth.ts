import { LoginForm, RegisterForm } from 'typings/auth'
import { User } from 'typings/user'
import { http } from './http'
const localStorageKey = '__auth__provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const fetchLogin = (form: LoginForm) => {
  return http<{ user: User }>('/login', {
    method: 'POST',
    data: form,
  }).then(response => handleUserResponse(response))
}

export const fetchRegister = (form: RegisterForm) => {
  return http<{ user: User }>('/register', {
    method: 'POST',
    data: form,
  }).then(response => handleUserResponse(response))
}

export const fetchLogout = async () =>
  window.localStorage.removeItem(localStorageKey)
