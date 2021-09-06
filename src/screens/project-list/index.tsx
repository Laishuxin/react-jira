import '../../wdyr'
import React from 'react'
import { SearchPanel } from './search-panel'
import { List } from './list'
import styled from '@emotion/styled'
import { useDebounce } from 'shared/hooks/use-debounce'
import { ErrorTypography } from '../../components/common/lib'
import { useProjects } from '../../shared/hooks/use-projects'
import { useUsers } from '../../shared/hooks/use-users'
import { useDocumentTitle } from '../../shared/hooks/use-document-title'
import { useProjectsSearchParams } from './hooks/use-projects-search-params'

export const ProjectListScreen = () => {
  useDocumentTitle('Project List')

  const [param, setParam] = useProjectsSearchParams()
  const { data: list, error, isLoading } = useProjects(useDebounce(param, 200))
  const { data: users } = useUsers()

  return (
    <Container>
      <SearchPanel param={param} setParam={setParam} />
      {error ? <ErrorTypography error={error} /> : null}
      <List dataSource={list || []} users={users || []} loading={isLoading} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`

ProjectListScreen.whyDidYouRender = true
