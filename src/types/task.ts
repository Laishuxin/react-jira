export interface ITask {
  id: number
  name: string
  processorId: number // 经办人 id
  projectId: number
  epicId: number // 任务组 id
  kanbanId: number
  typeId: number // 任务的类型 id
  note: string
}

export interface ITaskType {
  id: number
  name: string
}
