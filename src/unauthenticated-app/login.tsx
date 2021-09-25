import React from 'react'
import { Form, Input, message } from 'antd'
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
      message.success('登录成功！')
    } catch (e) {
      // message.error('登录失败！')
      return onError?.(e as any)
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
