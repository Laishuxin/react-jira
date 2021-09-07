import React from 'react'
import styled from '@emotion/styled'
import { ProjectListScreen } from 'screens/project-list'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ProjectScreen } from '../screens/project'
import { ProjectModal } from 'components/content/project-modal'
import { PageHeader } from '../components/content/page-header'

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        <Routes>
          <Route path={'/projects'} element={<ProjectListScreen />} />
          <Route path={'/projects/:projectId/*'} element={<ProjectScreen />} />
          <Navigate to={'/projects'} replace={true} />
        </Routes>
      </Main>
      <ProjectModal />
    </Container>
  )
}

const Container = styled('div')`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`

const Main = styled('main')`
  display: flex;
  height: calc(100vh - 6rem);
  overflow: hidden;
`
