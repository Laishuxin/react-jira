import React from 'react'
import { Form, Input } from 'antd'
import { useAuth } from 'context/auth-context'
import { LongButton } from 'components/common/lib'
import { useAsync } from '../shared/hooks/use-async'

interface ILoginScreenProps {
  onError?: (error: Error) => void
  onChange?: () => void
}
export const LoginScreen = ({ onError, onChange }: ILoginScreenProps) => {
  const { login } = useAuth()
  const { run, isLoading } = useAsync()

  const handleSubmit = async (values: {
    username: string
    password: string
  }) => {
    try {
      await run(login(values))
    } catch (e) {
      return onError?.(e)
    }
  }

  return (
    <Form onFinish={handleSubmit} onChange={onChange}>
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
        <LongButton loading={isLoading} htmlType='submit' type='primary'>
          login
        </LongButton>
      </Form.Item>
    </Form>
  )
}
