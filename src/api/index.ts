import * as qs from 'querystring'
import { cleanObject } from '../shared/utils'
import { ILoginForm, IParam } from '../types'

const BASE_URL = process.env.REACT_APP_API_URL
// const BASE_URL = 'http://localhost:3002'

export const fetchProjectList = (param: IParam) => {
  return fetch(`${BASE_URL}/projects?${qs.stringify(cleanObject(param))}`).then(
    response => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject([])
    },
  )
}

export const fetchProjectUsers = () => {
  return fetch(`${BASE_URL}/users`).then(response => {
    return response.ok ? response.json() : Promise.reject([])
  })
}

export const fetchLogin = (param: ILoginForm) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(param),
  }).then(response => {
    return response.ok ? response.json() : Promise.reject({})
  })
}
