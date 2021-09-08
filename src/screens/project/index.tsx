import React from 'react'
import { Link, Routes, Route, Navigate } from 'react-router-dom'
import { KanbanScreen } from '../kanban'
import { EpicScreen } from '../epic'
import styled from '@emotion/styled'
import { Menu } from 'antd'
import { useSelectedKeys } from './hooks/use-url'

export const ProjectScreen = () => {
  const selectedKeys = useSelectedKeys()
  return (
    <Container>
      <Aside>
        <Menu mode={'inline'} selectedKeys={selectedKeys}>
          <Menu.Item key={'kanban'}>
            <Link to={'kanban'}>看板</Link>
          </Menu.Item>
          <Menu.Item key={'epic'}>
            <Link to={'epic'}>任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path={'kanban'} element={<KanbanScreen />} />
          <Route path={'epic'} element={<EpicScreen />} />
          <Navigate to={'kanban'} replace={true} />
        </Routes>
      </Main>
    </Container>
  )
}

const Aside = styled('aside')`
  background-color: rgb(244, 245, 247);
  display: flex;
`

const Main = styled('div')`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`
const Container = styled('div')`
  display: grid;
  width: 100%;
  grid-template-columns: 18rem 1fr;
`
