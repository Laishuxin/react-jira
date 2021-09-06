import styled from '@emotion/styled'
import { Typography, List, Divider, Popover } from 'antd'
import { LinkButton } from 'components/common/lib'
import React from 'react'
import { useProjectModal } from 'shared/hooks/use-project-modal'
import { useProjects } from 'shared/hooks/use-projects'

export const ProjectPopover = () => {
  const { data: projects, isLoading } = useProjects()
  const pinnedProjects = projects?.filter(item => item.pin)
  const { open } = useProjectModal()

  const content = (
    <ContentContainer>
      <Typography.Text type={'secondary'}>收藏的项目</Typography.Text>
      <List>
        {pinnedProjects?.map(project => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <LinkButton onClick={open}>创建项目</LinkButton>
    </ContentContainer>
  )

  return (
    <Popover placement={'bottom'} content={content}>
      <span>项目</span>
    </Popover>
  )
}

const ContentContainer = styled('div')`
  width: 28rem;
`
