import React, { Fragment } from 'react'
import { Header } from 'components/content/header'
import { NotFound } from 'components/common/containers'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Projects } from 'views/projects'
import { Project } from 'views/projects/project'
import styled from '@emotion/styled'

export const AuthenticatedApp = () => {
  return (
    <Fragment>
      <Header />
      <Main>
        <Routes>
          <Route path='/projects' element={<Projects />} />
          <Route path='/projects/:projectId/*' element={<Project />} />
          <Navigate to='/projects' replace />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </Main>
    </Fragment>
  )
}

const Main = styled('main')`
  padding: 0 var(--padding-size);
`
