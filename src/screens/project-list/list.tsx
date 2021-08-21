import React from 'react'
import { Table } from 'antd'
import { IProject, IProjectList, IUserList } from 'types'
import { ColumnsType } from 'antd/lib/table'

interface IPropTypes {
  list: IProjectList
  users: IUserList
}

export const List = (props: IPropTypes) => {
  const { list, users } = props

  const columns: ColumnsType<IProject> = [
    {
      title: '名称',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
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
  ]
  return (
    <Table
      className='list'
      pagination={false}
      dataSource={list}
      columns={columns}
    />
  )
}
