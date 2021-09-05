export interface IProject {
  id: string
  name: string
  personId: number | string // todo: 修改签名
  organization: string
  created: number
}
