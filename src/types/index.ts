export interface IAuthForm {
  username: string
  password: string
}

export type IRegisterForm = IAuthForm

export interface IProject {
  id: number
  name: string
  personId: number
  organization: string
  created: number
}

export type IProjectList = IProject[]

export interface IUser {
  id: number
  name: string
  email: string
  title: string
  organization: string
  token: string
}

export type IUserList = IUser[]

export interface IParam {
  name: string
  personId: string
}

export type IFunction = (...arg: any[]) => any
