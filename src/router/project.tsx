import React from 'react'
import { useRoutes } from 'react-router-dom'
import { Projects } from 'views/projects'
import { Project } from 'views/projects/project'

export default function useProjectRoutes() {
  return useRoutes([
    {
      path: '/projects',
      element: <Projects />,
      children: [{ path: ':id/*', element: <Project /> }],
    },
  ])
}
