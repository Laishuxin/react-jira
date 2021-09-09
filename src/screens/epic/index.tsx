import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { List } from 'antd'
import dayjs from 'dayjs'
import { LinkButton, Row, ScreenContainer } from 'components/common/lib'
import { useDeleteEpic, useEpics } from 'shared/hooks/use-epics'
import { useEpicSearchParams, useEpicsQueryKey } from './hooks/use-utils'
import { IEpic } from 'types/epic'
import { useTasks } from 'shared/hooks/use-tasks'
import { ITask } from 'types/task'
import { useProjectInUrl } from 'screens/project/hooks/use-url'
import { confirm } from 'components/common/confirm'
import { CreateEpic } from './create-epic'
import styled from '@emotion/styled'

const getCurrentTaskByEpicId = (tasks: ITask[], id: number) => {
  return tasks.filter(task => task.epicId === id)
}

export const EpicScreen = () => {
  const { data: currentProject } = useProjectInUrl()
  const { data: epics = [] } = useEpics(useEpicSearchParams())
  const { data: tasks = [] } = useTasks({ projectId: currentProject?.id })
  const [isEpicCreateOpen, setIsEpicCreateOpen] = useState(false)

  if (!currentProject) return <h1>当前任务不存在</h1>

  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>{currentProject.name}任务组</h1>
        <LinkButton onClick={() => setIsEpicCreateOpen(true)}>
          创建任务组
        </LinkButton>
      </Row>
      <EpicsList
        epics={epics}
        tasks={tasks}
        currentProjectId={currentProject.id}
      />
      <CreateEpic
        onClose={() => setIsEpicCreateOpen(false)}
        visible={isEpicCreateOpen}
      />
    </ScreenContainer>
  )
}

interface IEpicsProps extends React.ComponentProps<typeof List> {
  epics: IEpic[]
  tasks: ITask[]
  currentProjectId: number
}

const EpicsList = (props: IEpicsProps) => {
  const { epics, tasks, currentProjectId } = props
  const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey())
  const handleDeleteEpic = (epicId: number) => {
    confirm({
      title: '确定删除当前任务组吗？',
      onOk() {
        deleteEpic({ id: epicId })
      },
    })
  }

  return (
    <List
      dataSource={epics}
      itemLayout={'vertical'}
      style={{ overflowY: 'auto', scrollbarWidth: 'thin' }}
      renderItem={epic => (
        <List.Item>
          <List.Item.Meta
            title={
              <Row between={true}>
                <span>{epic.name}</span>
                <LinkButton
                  style={{ marginRight: '4rem' }}
                  onClick={() => handleDeleteEpic(epic.id)}
                >
                  删除
                </LinkButton>
              </Row>
            }
            description={
              <section>
                <div>开始时间：{dayjs(epic.start).format('YYYY-MM-DD')}</div>
                <div>结束时间：{dayjs(epic.end).format('YYYY-MM-DD')}</div>
              </section>
            }
          />
          <ListContent
            // epic={epic}
            tasks={getCurrentTaskByEpicId(tasks, epic.id)}
            currentProjectId={currentProjectId}
          />
        </List.Item>
      )}
    />
  )
}

interface IListContentProps {
  // epic: IEpic
  tasks: ITask[]
  currentProjectId: number
}
const ListContent = ({ tasks, currentProjectId }: IListContentProps) => {
  return (
    <section>
      {tasks.map(task => (
        <Link
          style={{ marginRight: '1rem' }}
          to={`/kanban?editingTaskId=${task.id}`}
          key={task.id}
        >
          {task.name}
        </Link>
      ))}
    </section>
  )
}

const ListContentContainer = styled('section')`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`
