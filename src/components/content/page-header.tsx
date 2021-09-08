import React from 'react'
import { Dropdown, Menu } from 'antd'
import { LinkButton, Row } from 'components/common/lib'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { resetRoute } from 'shared/utils'
import { ProjectPopover } from 'components/content/project-popover'
import { useAuth } from 'context/auth-context'
import styled from '@emotion/styled'
import { UserPopover } from './user-list'

export const PageHeader = () => {
  return (
    <Header between={true} marginBottom={2} as={'header'}>
      <HeaderLeft gap={true}>
        <LinkButton onClick={resetRoute}>
          <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
        </LinkButton>
        <ProjectPopover />
        <UserPopover />
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  )
}

const User = () => {
  const { logout, user } = useAuth()
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key='logout'>
            <LinkButton onClick={logout}>logout</LinkButton>
          </Menu.Item>
        </Menu>
      }
    >
      <LinkButton>Hi, {user!.name}</LinkButton>
    </Dropdown>
  )
}

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`

const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``
