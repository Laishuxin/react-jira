import React from 'react'
import { Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import { ColumnsType } from 'antd/lib/table'
import { IProject } from 'types/project-types'
import { IUser } from 'types/user-types'
import { Link } from 'react-router-dom'

interface IPropTypes extends TableProps<IProject> {
  users: IUser[]
}

export const List = (props: IPropTypes) => {
  const { users, ...restProps } = props

  const columns: ColumnsType<IProject> = [
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
