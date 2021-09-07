import React from 'react'
import { useTasks } from 'shared/hooks/use-tasks'
import { IKanban } from 'types/kanban'
import { useTasksSearchParams } from './hooks/use-url'
import { useTaskTypes } from 'shared/hooks/use-task-types'
import bugIcon from 'assets/bug.svg'
import taskIcon from 'assets/task.svg'
import styled from '@emotion/styled'
import { Card } from 'antd'
import { CreateTask } from './create-task'

interface IKanbanColumnProps {
  kanban: IKanban
}

const TASK = 'task'
const BUG = 'bug'
const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: typeTasks = [] } = useTaskTypes()
  const name = typeTasks.find(taskType => taskType.id === id)?.name
  if (name === TASK) return <img src={bugIcon} alt={'bug-icon'} />
  if (name === BUG) return <img src={taskIcon} alt={'task-icon'} />

  return null
}

export const KanbanColumn = ({ kanban }: IKanbanColumnProps) => {
  const { data: allTasks = [] } = useTasks(useTasksSearchParams())
  const tasks = allTasks.filter(task => task.kanbanId === kanban.id)

  return (
    <Container>
      <h3>{kanban.name}</h3>
      <TaskContainer>
        {tasks.map(task => (
          <Card style={{ marginBottom: '0.5rem' }} key={task.id}>
            <div>
              <p>{task.name}</p>
              <TaskTypeIcon id={task.typeId} />
            </div>
          </Card>
        ))}
        <CreateTask kanbanId={kanban.id} />
      </TaskContainer>
    </Container>
  )
}

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;

  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
`

const TaskContainer = styled('div')`
  overflow: scroll;
  flex: 1;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`
