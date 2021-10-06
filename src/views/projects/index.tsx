import React from 'react'
import { ProjectDrawer } from 'components/content/project'
import { ProjectList } from './project-list'
import {
  useEditProject,
  useProjectList,
  useProjectParams,
} from 'hooks/content/use-project'
import { useUserList } from 'hooks/content/use-user'
import { SearchPanel } from './search-panel'
import { Header } from './header'
import { Project } from 'typings/project'
import { mutate } from 'shared/mutate'
import './index.css'

export const Projects = () => {
  const [params, setParams] = useProjectParams()
  const {
    data: projectList,
    updateData: updateProjectList,
    setData: setProjectList,
    isLoading: isFetchProjectListLoading,
  } = useProjectList(params)
  const { data: userList, isLoading: isFetchUserListLoading } = useUserList()
  const editProject = useEditProject()

  // TODO(rushui 2021-10-06): 实现节流
  const handleEditProject = (id: Project['id'], payload: Partial<Project>) => {
    mutate(editProject({ id, ...payload }), {
      onMutateAsync() {
        updateProjectList({ id, ...payload })
        return { previousProjectList: projectList }
      },
      onError: (e, context) => setProjectList(context.previousProjectList),
    })
  }
  return (
    <div>
      <Header />
      <SearchPanel params={params} setParams={setParams} />
      <ProjectList
        users={userList || []}
        projectList={projectList}
        loading={isFetchProjectListLoading || isFetchUserListLoading}
        editProject={handleEditProject}
      />
      <ProjectDrawer />
    </div>
  )
}

// Projects.whyDidYouRender = true
