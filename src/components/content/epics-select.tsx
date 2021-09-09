import React from 'react'
import { IdSelect } from '../common/id-select'
import { useEpics } from '../../shared/hooks/use-epics'
import { useEpicSearchParams } from '../../screens/epic/hooks/use-utils'

export const EpicsSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: epics, isLoading } = useEpics(useEpicSearchParams())
  return <IdSelect loading={isLoading} options={epics || []} {...props} />
}
