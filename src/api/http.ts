import { useAuth } from 'context/auth-context'
import qs from 'qs'
import { useCallback } from 'react'

const BASE_URL = process.env.REACT_APP_API_URL
const HTTP_AUTHENTICATION = 401

export interface Config extends RequestInit {
  data?: object
  token?: string
}

export const http = async <T = any>(
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {},
): Promise<T> => {
  const config: RequestInit = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
      ...headers,
    },
    ...customConfig,
  }

  if (config.method!.toUpperCase() === 'GET') {
    if (data) {
      endpoint += `?${qs.stringify(data)}`
    }
  } else {
    config.body = JSON.stringify(data || {})
  }

  return window.fetch(`${BASE_URL}${endpoint}`, config).then(async response => {
    if (response.status === HTTP_AUTHENTICATION) {
      await useAuth().logout()
      window.location.reload()
      return Promise.reject({ message: 'Please login again.' })
    }
    const data = await response.json()
    return response.ok ? (data as Promise<T>) : Promise.reject(data)
  })
}

export const useHttp = () => {
  const { user } = useAuth()
  return useCallback(
    <T = any>(...[endpoint, config]: Parameters<typeof http>) =>
      http<T>(endpoint, { ...config, token: user?.token }),
    [user?.token],
  )
}
