import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from 'store'

interface ProjectDrawer {
  isOpen: boolean
}

// Define the initial state using that type
const initialState: ProjectDrawer = {
  isOpen: false,
}

export const PROJECT_DRAWER = 'PROJECT_DRAWER'
export const projectDrawerSlice = createSlice({
  name: PROJECT_DRAWER,
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    open(state) {
      state.isOpen = true
    },
    close(state) {
      state.isOpen = false
    },
    revert(state) {
      state.isOpen = !state.isOpen
    },
  },
})

export const { open, close, revert } = projectDrawerSlice.actions
export const selectProjectDrawer = (state: RootState) =>
  state.PROJECT_DRAWER.isOpen
export default projectDrawerSlice.reducer
