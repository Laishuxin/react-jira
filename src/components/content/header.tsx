import React, { Fragment, memo } from 'react'
import Logo from 'components/content/logo'
import { User, Users } from 'components/content/user'
import styled from '@emotion/styled'
import { Divider, Popover, Typography } from 'antd'
import { CreateProject, PinProjects } from './project'

const Container = styled('header')`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 60px;
  padding: 0 var(--padding-size);
  background: white;
  border-bottom: 2px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 5px;
`

const Navigator = styled('nav')`
  flex: 1;
  > * {
    margin-left: 2rem;
  }
`

const Nav = () => {
  return (
    <Navigator>
      <Popover
        placement='bottom'
        content={
          <PopoverContentContainer
            style={{ width: '20rem' }}
            title='收藏的项目'
          >
            <PinProjects />
            <Divider />
            <CreateProject />
          </PopoverContentContainer>
        }
      >
        <span style={{ cursor: 'default' }}>项目</span>
      </Popover>
      <Popover
        placement='bottom'
        content={
          <PopoverContentContainer title='组员列表'>
            <Users />
          </PopoverContentContainer>
        }
      >
        <span style={{ cursor: 'default' }}>组员</span>
      </Popover>
    </Navigator>
  )
}

interface PopoverContentContainerProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  title: string
}
const PopoverContentContainer = ({
  title,
  children,
  ...restProps
}: React.PropsWithChildren<PopoverContentContainerProps>) => {
  return (
    <div {...restProps}>
      <Typography.Text type={'secondary'}>{title}</Typography.Text>
      {children}
    </div>
  )
}

export const Header = memo(() => {
  return (
    <Container>
      <Logo />
      <Nav />
      <User />
    </Container>
  )
})
