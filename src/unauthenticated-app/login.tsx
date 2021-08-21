import React from 'react'
import { Form, Input } from 'antd'
import { useAuth } from 'context/auth-context'
import { LongButton } from 'components/common'

export const LoginScreen = () => {
  const { login } = useAuth()

  const handleSubmit = (values: { username: string; password: string }) => {
    login(values)
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name='username' rules={[{ required: true }]}>
        <Input
          placeholder='Please enter username'
          type='text'
          id={'username'}
        />
      </Form.Item>
      <Form.Item name='password' rules={[{ required: true }]}>
        <Input
          placeholder='Please enter password'
          type='password'
          id='password'
        />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType='submit' type='primary'>
          login
        </LongButton>
      </Form.Item>
    </Form>
  )
}
