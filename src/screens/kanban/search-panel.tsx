import React, { useState, useCallback } from 'react'
import { Row } from 'components/common/lib'
import { Button, Input } from 'antd'
import { useTasksSearchParams } from '../project/hooks/use-url'
import { useSetUrlSearchParam } from 'shared/hooks/use-query-param'
import { UserSelect } from 'components/content/user-select'
import { TaskTypesSelect } from 'components/content/task-types-select'

const useTaskName = (name = '') => {
  const setParams = useSetUrlSearchParam()
  const [taskName, _setTaskName] = useState(name)
  const setTaskName = useCallback(
    (name: string) => {
      if (!name) setParams({ name })
      _setTaskName(name)
    },
    [setParams],
  )
  return [taskName, setTaskName] as const
}

export const SearchPanel = () => {
  const { processorId, projectId, tagId, typeId, name } = useTasksSearchParams()
  const setParams = useSetUrlSearchParam()
  const [taskName, setTaskName] = useTaskName(name)

  const reset = () => {
    setTaskName('')
    setParams({
      processorId: undefined,
      tagId: undefined,
      typeId: undefined,
      name: undefined,
    })
  }

  const handleSearch = () => {
    setParams({ name: taskName })
  }

  return (
    <Row gap={true} marginBottom={4}>
      <Input
        placeholder={'任务名'}
        style={{ width: '20rem' }}
        value={taskName}
        onChange={e => setTaskName(e.target.value)}
        onPressEnter={handleSearch}
      />
      <UserSelect
        defaultOptionName={'经办人'}
        value={processorId}
        onChange={processorId => setParams({ processorId, name: taskName })}
      />
      <TaskTypesSelect
        defaultOptionName={'类型'}
        value={typeId}
        onChange={typeId => setParams({ typeId, name: taskName })}
      />
      <Button onClick={handleSearch}>搜索</Button>
      <Button onClick={reset}>清除筛选器</Button>
    </Row>
  )
}
