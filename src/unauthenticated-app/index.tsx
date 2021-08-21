import React, { useState } from 'react'
import { LoginScreen } from 'screens/login-screen'
import { RegisterScreen } from './register'

export const UnAuthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false)
  return (
    <div>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}
      <button onClick={() => setIsRegister(!isRegister)}>
        切换到{isRegister ? 'login' : 'register'}
      </button>
    </div>
  )
}
