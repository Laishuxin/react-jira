import { Card, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAddTask } from 'shared/hooks/use-tasks'
import { useProjectIdInUrl, useTasksQueryKey } from '../project/hooks/use-url'

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState('')
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey())
  const projectId = useProjectIdInUrl()
  const [inputMode, setInputMode] = useState(false)

  // TODO(rushui 2021-09-08): 处理错误情况
  // TODO(rushui 2021-09-07): 更好的用户提示
  const submit = async () => {
    if (!name) toggle()
    await addTask({ projectId, name, kanbanId })
    setInputMode(false)
    setName('')
  }

  const toggle = () => setInputMode(mode => !mode)

  useEffect(() => {
    if (!inputMode) {
      setName('')
    }
  }, [inputMode])

  if (!inputMode) {
    return (
      <div onClick={toggle} style={{ cursor: 'default' }}>
        + 创建事务
      </div>
    )
  }

  return (
    <Card>
      <Input
        onBlur={toggle}
        onPressEnter={submit}
        autoFocus={true}
        onChange={e => setName(e.target.value)}
      />
    </Card>
  )
}
