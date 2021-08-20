import React from 'react'
import { SearchPanel } from './search-panel'
import { List } from './list'
import { useEffect, useState } from 'react'
import { fetchProjectUsers, fetchProjectList } from 'api'
import { useDebounce, useMount } from 'shared/hooks'
import { IParam, IProject, IUser } from 'types'

export const ProjectScreen = () => {
  const [list, setList] = useState<IProject[]>([])
  const [users, setUsers] = useState<IUser[]>([])
  const [param, setParam] = useState<IParam>({
    name: '',
    personId: '',
  })

  const debouncedParam = useDebounce(param, 200)

  //* useEffect blog: https://dmitripavlutin.com/react-useeffect-explanation/#:~:text=The%20useEffect%20%28callback%2C%20%5Bprop%2C%20state%5D%29%20invokes%20the%20callback,independently%20from%20the%20rendering%20cycles%20of%20the%20component.
  useEffect(() => {
    try {
      const fetchList = async () => {
        const list = await fetchProjectList(debouncedParam)
        setList(list)
      }
      fetchList()
    } catch (_) {}
  }, [debouncedParam])

  useMount(() => {
    try {
      const fetchUser = async () => {
        const users = await fetchProjectUsers()
        setUsers(users)
      }
      fetchUser()
    } catch (_) {}
  })

  return (
    <div className='screen'>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  )
}
