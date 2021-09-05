import React from 'react'
import { SearchPanel } from './search-panel'
import { List } from './list'
import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useDebounce } from 'shared/hooks/use-debounce'
import { useHttp } from 'api/http'
import { useMount } from 'shared/hooks/use-mount'
import { ErrorTypography } from '../../components/common/lib'
import { useProjects } from '../../shared/hooks/use-projects'
import { useUsers } from '../../shared/hooks/use-users'
import { IUser } from '../../types/user-types'
import { useDocumentTitle } from '../../shared/hooks/use-document-title'

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  useDocumentTitle('Project List')
  const debouncedParam = useDebounce(param, 200)
  const { data: list, error, isLoading } = useProjects(debouncedParam)
  const { data: users } = useUsers()

  return (
    <Container>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? <ErrorTypography error={error} /> : null}
      <List dataSource={list || []} users={users || []} loading={isLoading} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
