import React from 'react'
import { useAuth } from 'context/auth-context'
import { Form, Input } from 'antd'
import { LongButton } from 'components/common/lib'
import { useAsync } from '../shared/hooks/use-async'

interface IRegisterScreenProps {
  onError?: (error: Error) => void
  onChange?: () => void
}
export const RegisterScreen = ({ onError, onChange }: IRegisterScreenProps) => {
  const { register } = useAuth()
  const { run, isLoading } = useAsync()

  const handleSubmit = async (values: {
    username: string
    password: string
    cpassword: string
  }) => {
    if (values.password !== values.cpassword) {
      onError?.(new Error('Password is inconsistent.'))
      return
    }
    try {
      await run(register(values))
    } catch (e) {
      onError?.(e)
    }
  }

  return (
    <Form onFinish={handleSubmit} onChange={onChange}>
      <Form.Item name='username' rules={[{ required: true }]}>
        <Input
          id={'r-username'}
          placeholder='Please enter username'
          type='text'
          key={'r-username'}
          autoComplete={'false'}
        />
      </Form.Item>
      <Form.Item name='password' rules={[{ required: true }]}>
        <Input
          placeholder='Please enter password'
          type='password'
          id='r-password'
          key={'r-password'}
          autoComplete={'false'}
        />
      </Form.Item>
      <Form.Item name='cpassword' rules={[{ required: true }]}>
        <Input
          placeholder='Please confirm password'
          type='password'
          id='r-cpassword'
        />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType='submit' type='primary'>
          register
        </LongButton>
      </Form.Item>
    </Form>
  )
}
