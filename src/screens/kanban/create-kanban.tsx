import { Input } from 'antd'
import React, { useState } from 'react'
import { useAddKanban } from 'shared/hooks/use-kanbans'
import { useKanbanQueryKey, useProjectIdInUrl } from './hooks/use-url'
import { Container } from './kanban-column'

export const CreateKanban = () => {
  const [name, setName] = useState('')
  const projectId = useProjectIdInUrl()
  const { mutateAsync: addKanban } = useAddKanban(useKanbanQueryKey())

  const submit = async () => {
    if (!name) return
    await addKanban({ name, projectId })
    setName('')
  }

  return (
    <Container>
      <Input
        value={name}
        size={'large'}
        placeholder={'新建看板名称'}
        onPressEnter={submit}
        onChange={e => setName(e.target.value)}
      />
    </Container>
  )
}
