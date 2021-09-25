import { Popover, Typography, List } from 'antd'
import React from 'react'
import { useUsers } from 'shared/hooks/use-users'

export const UserPopover = () => {
  return (
    <Popover placement={'bottom'} content={<Content />}>
      <span style={{ cursor: 'default' }}>组员</span>
    </Popover>
  )
}

const Content = () => {
  const { data: users = [] } = useUsers()
  return (
    <div>
      <Typography.Text type={'secondary'}>组员列表</Typography.Text>
      <List>
        {users.map(user => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name} />
          </List.Item>
        ))}
      </List>
    </div>
  )
}
