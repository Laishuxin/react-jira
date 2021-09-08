import React from 'react'
import { Row } from 'components/common/lib'
import { Button, Input } from 'antd'
import { useTasksSearchParams } from '../project/hooks/use-url'
import { useSetUrlSearchParam } from 'shared/hooks/use-query-param'
import { UserSelect } from 'components/content/user-select'
import { TaskTypesSelect } from 'components/content/task-types-select'

export const SearchPanel = () => {
  const { processorId, projectId, tagId, typeId, name } = useTasksSearchParams()
  const setParams = useSetUrlSearchParam()
  const reset = () =>
    setParams({
      processorId: undefined,
      tagId: undefined,
      typeId: undefined,
      name: undefined,
    })
  return (
    <Row gap={true} marginBottom={4}>
      <Input
        placeholder={'任务名'}
        style={{ width: '20rem' }}
        value={name}
        onChange={e => setParams({ name: e.target.value })}
      />
      <UserSelect
        defaultOptionName={'经办人'}
        value={processorId}
        onChange={processorId => setParams({ processorId })}
      />
      <TaskTypesSelect
        defaultOptionName={'类型'}
        value={typeId}
        onChange={typeId => setParams({ typeId })}
      />
      <Button onClick={reset}>清除筛选器</Button>
    </Row>
  )
}
