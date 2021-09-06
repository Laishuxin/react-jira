import React from 'react'
import { Button, Drawer } from 'antd'
import { useProjectModal } from 'shared/hooks/use-project-modal'

export const ProjectModal = () => {
  const { isProjectModalOpen, close } = useProjectModal()

  return (
    <Drawer onClose={close} width={'100%'} visible={isProjectModalOpen}>
      <h1>Project Modal</h1>
      <Button onClick={close}>close</Button>
    </Drawer>
  )
}
