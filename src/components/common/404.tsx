import { Button } from 'antd'
import React from 'react'
import { resetRoute } from 'shared/utils'
import { FullPage } from './lib'

export const NotFound = () => {
  return (
    <FullPage style={{ flexDirection: 'column' }}>
      <h1>404 Not Found</h1>
      <div className='btns'>
        <Button type={'primary'} onClick={resetRoute}>
          返回首页
        </Button>
      </div>
    </FullPage>
  )
}
