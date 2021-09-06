import React from 'react'
import { Dropdown, Table, TableProps, Menu, Modal } from 'antd'
import dayjs from 'dayjs'
import { ColumnsType } from 'antd/lib/table'
import { IProject } from 'types/project-types'
import { IUser } from 'types/user-types'
import { Link } from 'react-router-dom'
import { Pin } from '../../components/common/pin'
import { useEditProject } from '../../shared/hooks/use-projects'
import { LinkButton } from 'components/common/lib'
import { useProjectModal } from 'shared/hooks/use-project-modal'
import { useDeleteProject } from 'shared/hooks/use-projects'
import { useProjectsQueryKey } from './hooks/use-projects-query-key'

interface IPropTypes extends TableProps<IProject> {
  users: IUser[]
  // refresh: (...args: any[]) => Promise<IProject[]>
}

export const List = (props: IPropTypes) => {
  const { users, /*refresh, */ ...restProps } = props
  const { mutate } = useEditProject(useProjectsQueryKey())

  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }) /*.then(refresh)*/

  const columns: ColumnsType<IProject> = [
    {
      title: <Pin checked={false} disabled={true} />,
      render(_, project) {
        return (
          <Pin checked={project.pin} onCheckedChange={pinProject(project.id)} />
        )
      },
    },
    {
      title: '名称',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render(_, project) {
        return <Link to={String(project.id)}>{project.name}</Link>
      },
    },
    {
      title: '部门',
      dataIndex: 'organization',
    },
    {
      title: '负责人',
      render(_, project) {
        return (
          <span>
            {users.find(user => user.id === project.personId)?.name || '未知'}
          </span>
        )
      },
    },
    {
      title: '创建时间',
      render: (_, project) =>
        project.created ? dayjs(project.created).format('YYYY-MM-DD') : '未知',
    },
    {
      render(_, project) {
        return <More project={project} />
      },
    },
  ]
  return (
    <Table
      className='list'
      rowKey='id'
      pagination={false}
      columns={columns}
      {...restProps}
    />
  )
}

const More = ({ project }: { project: IProject }) => {
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey())
  const { startEdit } = useProjectModal()
  const handleDelete = (id: number) => {
    // TODO(rushui 2021-09-06): confirm before deleting.
    Modal.confirm({
      title: '确定删除这个项目吗？',
      content: '点击确定删除',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        deleteProject({ id })
      },
    })
  }
  return (
    <Dropdown
      overlay={
        <Menu style={{ width: '8rem', textAlign: 'center' }}>
          <Menu.Item key={'edit'}>
            <LinkButton onClick={() => startEdit(project.id)}>编辑</LinkButton>
          </Menu.Item>
          <Menu.Item key={'delete'}>
            <LinkButton onClick={() => handleDelete(project.id)}>
              删除
            </LinkButton>
          </Menu.Item>
        </Menu>
      }
    >
      <LinkButton>...</LinkButton>
    </Dropdown>
  )
}
