import { configureStore } from '@reduxjs/toolkit'
import projectDrawerReducer, { PROJECT_DRAWER } from './slice/project-drawer'
import projectListReducer, { PROJECT_LIST } from './slice/project-list'

const store = configureStore({
  reducer: {
    [PROJECT_DRAWER]: projectDrawerReducer,
    [PROJECT_LIST]: projectListReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
