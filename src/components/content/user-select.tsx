import React from 'react'
import { IdSelect } from '../common/id-select'
import { useUsers } from '../../shared/hooks/use-users'

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers()
  return <IdSelect options={users || []} {...props} />
}
