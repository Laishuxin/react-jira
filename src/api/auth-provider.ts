import { BASE_URL } from './index'
import { IAuthForm, IRegisterForm, IUser } from 'types/index'
const localStorageKey = '__auth__provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({ user }: { user: IUser }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const fetchLogin = (data: IAuthForm) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
  }).then(async response => {
    if (response.ok) {
      return handleUserResponse(await response.json())
    } else {
      return Promise.reject(data)
    }
  })
}

export const fetchRegister = (data: IRegisterForm) => {
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
  }).then(async response => {
    if (response.ok) {
      return handleUserResponse(await response.json())
    } else {
      return Promise.reject(data)
    }
  })
}

export const fetchLogout = async () =>
  window.localStorage.removeItem(localStorageKey)

type a = Partia<typeof fetchLogin>