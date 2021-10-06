import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'store'
import { Project } from 'typings/project'

//* 由于 partialList 需要依靠后台获取，如果直接根据 params 对 projectList 进行查找，
//* 结果可能和后端返回的结果不一致，为了实现定制化功能，前端不应该执行查询操作，而是向
//* 后端获取数据。
//* 但是，如果使用同一个 list 来保存后端获取的数据则会导致意想不到的 bug：
//* 在 projects 依赖同一个 list 是没有问题的，但是，在 header 中也使用到 list，而且
//* 需要使用全量的 project list，为了避免在 projects 中修改 list 也会作用到 header 上，
//* 设置了 list 和 partialList 用于区分。
interface ProjectList {
  list: Project[]
  partialList: Project[]
}

// Define the initial state using that type
const initialState: ProjectList = {
  list: [],
  partialList: [],
}

export const PROJECT_LIST = 'PROJECT_LIST'
export const projectListSlice = createSlice({
  name: PROJECT_LIST,
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setList(state, action: PayloadAction<Project[]>) {
      state.list = action.payload
    },
    setPartialList(state, action: PayloadAction<Project[]>) {
      state.partialList = action.payload
    },
    updateList(state, action: PayloadAction<Partial<Project>>) {
      const id = action.payload.id
      if (id === undefined) {
        return state
      }
      state.list = state.list.map(item =>
        item.id !== id ? item : { ...item, ...action.payload },
      )
    },
    updatePartialList(state, action: PayloadAction<Partial<Project>>) {
      const id = action.payload.id
      if (id === undefined) {
        return state
      }
      state.partialList = state.partialList.map(item =>
        item.id !== id ? item : { ...item, ...action.payload },
      )
    },
  },
})

export const { setList, setPartialList, updateList, updatePartialList } =
  projectListSlice.actions
export const selectProjectList = (state: RootState) => state.PROJECT_LIST.list
export const selectProjectPartialList = (state: RootState) =>
  state.PROJECT_LIST.partialList

export default projectListSlice.reducer
