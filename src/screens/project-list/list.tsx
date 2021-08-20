import React from 'react'
import { IProjectList, IUserList } from 'types'

interface IPropTypes {
  list: IProjectList
  users: IUserList
}

export const List = (props: IPropTypes) => {
  const { list, users } = props
  return (
    <table className='list'>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map(project => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>
              {users.find(user => user.id === project.personId)?.name || '未知'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
