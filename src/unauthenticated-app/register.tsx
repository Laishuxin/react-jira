import React from 'react'
import { useAuth } from 'context/auth-context'
import { Form, Input } from 'antd'
import { LongButton } from 'components/common/lib'

export const RegisterScreen = () => {
  const { register } = useAuth()

  const handleSubmit = (values: {
    username: string
    password: string
    cpassword: string
  }) => {
    register(values)
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
      <Form.Item name='cpassword' rules={[{ required: true }]}>
        <Input
          placeholder='Please confirm password'
          type='password'
          id='cpassword'
        />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType='submit' type='primary'>
          register
        </LongButton>
      </Form.Item>
    </Form>
  )
}
