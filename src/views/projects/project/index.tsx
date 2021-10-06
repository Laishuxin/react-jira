import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Epic } from './epic'
import { Kanban } from './kanban'

export const Project = () => {
  return (
    <div>
      <h1>project..............</h1>
      <Routes>
        <Route path='kanban' element={<Kanban />} />
        <Route path='epic' element={<Epic />} />
        <Route path='*' element={<Navigate to='kanban' replace />} />
      </Routes>
    </div>
  )
}
