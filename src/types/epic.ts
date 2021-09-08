export interface IEpic {
  id: number
  name: string
  projectId: number
  kanbanId: number

  start: number // 任务开始时间
  end: number // 任务结束时间
}
