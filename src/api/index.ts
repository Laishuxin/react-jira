import * as qs from 'querystring'
import { cleanObject } from '../shared/utils'
import { IParam } from '../types'
import { http } from './http'

export const BASE_URL = process.env.REACT_APP_API_URL
// const BASE_URL = 'http://localhost:3002'

export const fetchProjectList = (param: IParam) => {
  return http('/projects', { data: cleanObject(param) })
  // return fetch(`${BASE_URL}/projects?${qs.stringify(cleanObject(param))}`).then(
  //   response => {
  //     if (response.ok) {
  //       return response.json()
  //     }
  //     return Promise.reject(param)
  //   },
  // )
}

export const fetchProjectUsers = () => {
  return http('/users')
  // return fetch(`${BASE_URL}/users`).then(response => {
  //   return response.ok ? response.json() : Promise.reject()
  // })
}
