import React from 'react'
import { SearchPanel } from './search-panel'
import { List } from './list'
import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useDebounce, useMount } from 'shared/hooks'
import { IParam, IProject, IUser } from 'types'
import { useHttp } from 'api/http'
import { cleanObject } from 'shared/utils'

export const ProjectScreen = () => {
  const [list, setList] = useState<IProject[]>([])
  const [users, setUsers] = useState<IUser[]>([])
  const client = useHttp()
  const [param, setParam] = useState<IParam>({
    name: '',
    personId: '',
  })

  const debouncedParam = useDebounce(param, 200)

  //* useEffect blog: https://dmitripavlutin.com/react-useeffect-explanation/#:~:text=The%20useEffect%20%28callback%2C%20%5Bprop%2C%20state%5D%29%20invokes%20the%20callback,independently%20from%20the%20rendering%20cycles%20of%20the%20component.
  useEffect(() => {
    client('/projects', { data: cleanObject(debouncedParam) })
      .then(setList)
      .catch(_ => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam])

  useMount(() => {
    client('/users')
      .then(setUsers)
      .catch(_ => {})
  })

  return (
    <Container>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
