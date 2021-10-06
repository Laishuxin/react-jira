import React from 'react'
import styled from '@emotion/styled'
import { Button } from 'antd'

export const LongButton = styled(Button)`
  width: 100%;
`

export const LinkButton = (props: React.ComponentProps<typeof Button>) => {
  return <Button style={{ padding: 0 }} type='link' {...props} />
}
