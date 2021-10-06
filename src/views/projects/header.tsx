import React, { memo } from 'react'
import { Row } from 'antd'
import { CreateProject } from 'components/content/project'

export const Header = memo(
  () => {
    return (
      <Row justify='space-between' className='projects-header'>
        <h1 className='projects-title'>项目列表</h1>
        <CreateProject />
      </Row>
    )
  },
  () => false,
)
