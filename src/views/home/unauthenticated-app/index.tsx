import React, { useState, useCallback } from 'react'
import styled from '@emotion/styled'
import { FullHorizontalCenterContainer } from 'components/common/containers'
import { ShadowCard } from 'components/common/card'
import { Login } from './login'
import { Register } from './register'
import logo from 'assets/logo.svg'
import { Divider } from 'antd'
import { LinkButton } from 'components/common/button'
import { ErrorText } from 'components/common/text'

// TODO(rushui 2021-10-03): 添加背景
export const UnauthenticatedApp = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState<null | Error>(null)
  const handleClick = useCallback(() => {
    setIsLogin(status => !status)
  }, [])
  return (
    <FullHorizontalCenterContainer>
      <Header />
      <Card>
        {error !== null ? <ErrorText error={error} /> : null}
        {isLogin ? (
          <Login setError={setError} />
        ) : (
          <Register setError={setError} />
        )}
        {/* <LongButton type='primary'>{isLogin ? '登录' : '注册'}</LongButton> */}
        <Divider />
        <LinkButton onClick={handleClick}>
          {isLogin ? '首次使用？点我注册' : '已有账号，直接登录'}
        </LinkButton>
      </Card>
    </FullHorizontalCenterContainer>
  )
}

const Header = styled(`div`)`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`
const Card = styled(ShadowCard)`
  width: 40rem;
  min-height: 40rem;
  padding: 3.2rem 4rem;
  text-align: center;
`
