import styled from '@emotion/styled'
import { Button, Spin } from 'antd'
import React, { useCallback } from 'react'

export const NotFound = () => {
  const handleClick = useCallback(() => {
    window.location.href = window.location.origin
  }, [])
  return (
    <FullCenterContainer style={{ flexDirection: 'column' }}>
      <h1>404 Not Found</h1>
      <Button type='primary' onClick={handleClick}>
        返回首页
      </Button>
    </FullCenterContainer>
  )
}
export const FullCenterContainer = styled('div')`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  -index: 1000;
`

export const FullHorizontalCenterContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`

export const FullScreenLoading = () => {
  return (
    <FullCenterContainer>
      <Spin size='large' />
    </FullCenterContainer>
  )
}
