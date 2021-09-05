import React from 'react'
import { Dropdown, Menu } from 'antd'
import styled from '@emotion/styled'
import { useAuth } from 'context/auth-context'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { LinkButton, Row } from 'components/common/lib'
import { ProjectListScreen } from 'screens/project-list'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ProjectScreen } from './screens/project'
import { resetRoute } from './shared/utils'

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        {/*<ProjectListScreen />*/}
        <Routes>
          <Route path={'/projects'} element={<ProjectListScreen />} />
          <Route path={'/projects/:projectId/*'} element={<ProjectScreen />} />
          <Navigate to={'/projects'} replace={true} />
        </Routes>
      </Main>
    </Container>
  )
}

const PageHeader = () => {
  const { logout, user } = useAuth()
  return (
    <Header between={true} marginBottom={2} as={'header'}>
      <HeaderLeft gap={true}>
        <LinkButton onClick={resetRoute}>
          <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
        </LinkButton>
        <h3>项目</h3>
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
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
      </HeaderRight>
    </Header>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`

const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``

const Main = styled.main`
  height: calc(100vh - 6rem);
`
