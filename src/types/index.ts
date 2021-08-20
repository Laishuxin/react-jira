export interface ILoginForm {
  username: string
  password: string
}

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
}

export type IUserList = IUser[]

export interface IParam {
  name: string
  personId: string
}

export type IFunction = (...arg: any[]) => any
