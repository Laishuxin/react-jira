import React, { Fragment } from 'react'
import { useAuthContext } from 'context/auth-context'
import { LinkButton } from 'components/common/button'
import { Dropdown, List, Menu, Typography } from 'antd'
import { useUserList } from 'hooks/content/use-user'
import { IdSelect } from 'components/common/id-select'
import { isUnDef } from 'shared/utils'

export const User = () => {
  const { user, logout } = useAuthContext()
  return (
    <Dropdown
      placement='bottomCenter'
      overlay={
        <Menu>
          <Menu.Item key='logout'>
            <LinkButton onClick={logout}>退出登录</LinkButton>
          </Menu.Item>
        </Menu>
      }
    >
      <LinkButton>Hi, {user!.name}</LinkButton>
    </Dropdown>
  )
}

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users, isLoading } = useUserList()
  return <IdSelect options={users || []} loading={isLoading} {...props} />
}

export const Users = () => {
  const { data } = useUserList()
  const users = data === null ? [] : data
  return (
    <List>
      {users.map(user => (
        <List.Item key={user.id}>
          <List.Item.Meta title={user.name} />
        </List.Item>
      ))}
    </List>
  )
}
