import React from 'react'
import { useTasks } from 'shared/hooks/use-tasks'
import { IKanban } from 'types/kanban'
import { useKanbanQueryKey, useTasksSearchParams } from './hooks/use-url'
import { useTaskTypes } from 'shared/hooks/use-task-types'
import bugIcon from 'assets/bug.svg'
import taskIcon from 'assets/task.svg'
import styled from '@emotion/styled'
import { Card, Dropdown, Menu } from 'antd'
import { CreateTask } from './create-task'
import { useTasksModal } from 'shared/hooks/use-task-modal'
import { ITask } from 'types/task'
import { Mark } from 'components/common/mark'
import { LinkButton, Row } from 'components/common/lib'
import { useDeleteKanban } from 'shared/hooks/use-kanbans'
import { confirm } from 'components/common/confirm'

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
      <Row between={true}>
        <h3>{kanban.name}</h3>
        <More kanban={kanban} />
      </Row>
      <TaskContainer>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
        <CreateTask kanbanId={kanban.id} />
      </TaskContainer>
    </Container>
  )
}

const TaskCard = ({ task }: { task: ITask }) => {
  const { startEdit } = useTasksModal()
  const { name: keyword } = useTasksSearchParams()

  return (
    <Card
      onClick={() => startEdit(task.id)}
      style={{ marginBottom: '0.5rem', cursor: 'pointer' }}
      key={task.id}
    >
      <div>
        <p>
          <Mark keyword={keyword} name={task.name} />
        </p>
        <TaskTypeIcon id={task.typeId} />
      </div>
    </Card>
  )
}

const More = ({ kanban }: { kanban: IKanban }) => {
  const { mutateAsync: deleteKanban } = useDeleteKanban(useKanbanQueryKey())

  const handleDeleteKanban = () => {
    confirm({
      title: '确定删除看板吗',
      onOk() {
        return deleteKanban({ id: kanban.id })
      },
    })
  }

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={'delete-kanban'}>
            <LinkButton onClick={handleDeleteKanban}>删除</LinkButton>
          </Menu.Item>
        </Menu>
      }
    >
      <LinkButton>...</LinkButton>
    </Dropdown>
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
