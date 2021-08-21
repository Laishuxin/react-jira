import { Button, Divider } from 'antd'
import React, { useState } from 'react'
import { LoginScreen } from './login'
import { RegisterScreen } from './register'
import { Background, Header, ShadowCard } from 'components/content'
import { Container } from 'components/common'

export const UnAuthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false)
  return (
    <Container>
      <Background />
      <Header />
      <ShadowCard>
        {isRegister ? <RegisterScreen /> : <LoginScreen />}
        <Divider />
        <Button type='link' onClick={() => setIsRegister(!isRegister)}>
          {isRegister
            ? 'Already have an account? Sign in'
            : 'New to Jira? Create an account'}
        </Button>
      </ShadowCard>
    </Container>
  )
}
