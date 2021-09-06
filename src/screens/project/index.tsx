import React from 'react'
import { Link, Routes, Route, Navigate } from 'react-router-dom'
import { KanbanScreen } from '../kanban'
import { EpicScreen } from '../epic'

export const ProjectScreen = () => {
  return (
    <div>
      <h1>project screen</h1>
      <Link to={'kanban'}>看板</Link>
      <Link to={'epic'}>任务组</Link>
      <Routes>
        <Route path={'kanban'} element={<KanbanScreen />} />
        <Route path={'epic'} element={<EpicScreen />} />
        <Navigate to={'kanban'} replace={true} />
      </Routes>
    </div>
  )
}
