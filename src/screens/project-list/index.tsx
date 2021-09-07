import '../../wdyr'
import React from 'react'
import { SearchPanel } from './search-panel'
import { List } from './list'
import { useDebounce } from 'shared/hooks/use-debounce'
import {
  ErrorTypography,
  LinkButton,
  ScreenContainer,
} from '../../components/common/lib'
import { useProjects } from '../../shared/hooks/use-projects'
import { useUsers } from '../../shared/hooks/use-users'
import { useDocumentTitle } from '../../shared/hooks/use-document-title'
import { useProjectsSearchParams } from './hooks/use-projects-search-params'
import { Row } from 'antd'
import { useProjectModal } from 'shared/hooks/use-project-modal'

export const ProjectListScreen = () => {
  useDocumentTitle('Project List')

  const [param, setParam] = useProjectsSearchParams()
  const { data: list, error, isLoading } = useProjects(useDebounce(param, 200))
  const { data: users } = useUsers()
  const { open } = useProjectModal()

  return (
    <ScreenContainer>
      <Row justify={'space-between'}>
        <h1>项目列表</h1>
        <LinkButton onClick={open}>创建项目</LinkButton>
      </Row>
      <SearchPanel param={param} setParam={setParam} />
      {error ? <ErrorTypography error={error} /> : null}
      <List dataSource={list || []} users={users || []} loading={isLoading} />
    </ScreenContainer>
  )
}
