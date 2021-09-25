import React, { useCallback, useState } from 'react'
import { Button, Card, Divider } from 'antd'
import styled from '@emotion/styled'
import { LoginScreen } from './login'
import logo from 'assets/logo.svg'
import left from 'assets/left.svg'
import right from 'assets/right.svg'
import { Container, ErrorTypography } from 'components/common/lib'
import { RegisterScreen } from './register'

export default function UnAuthenticatedApp() {
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const handleClick = useCallback(() => {
    setIsRegister(r => !r)
    setError(null)
  }, [setIsRegister, setError])
  const handleChange = () => setError(null)
  return (
    <Container>
      <Background />
      <Header />
      <ShadowCard>
        <ErrorContainer style={{ opacity: error ? '100%' : '0' }}>
          <ErrorTypography error={error} />
        </ErrorContainer>
        {isRegister ? (
          <RegisterScreen onError={setError} onChange={handleChange} />
        ) : (
          <LoginScreen onError={setError} onChange={handleChange} />
        )}
        <Divider />
        <Button type='link' onClick={handleClick}>
          {isRegister
            ? 'Already have an account? Sign in'
            : 'New to Jira? Create an account'}
        </Button>
      </ShadowCard>
    </Container>
  )
}

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;

  background-image: url(${left}), url(${right});
`
const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 40rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`

const ErrorContainer = styled('div')`
  height: 3rem;
  transition: all 0.5s;
`
