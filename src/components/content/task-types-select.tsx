import React from 'react'
import { useTaskTypes } from 'shared/hooks/use-task-types'
import { IdSelect } from '../common/id-select'

export const TaskTypesSelect = (
  props: React.ComponentProps<typeof IdSelect>,
) => {
  const { data: taskTypes, isLoading } = useTaskTypes()
  return <IdSelect loading={isLoading} options={taskTypes || []} {...props} />
}
