import React, { useCallback } from 'react'
import { Form, Input, message } from 'antd'
import { LongButton } from 'components/common/button'
import { useAuthContext } from 'context/auth-context'
interface LoginFormFields {
  username: string
  password: string
}

interface LoginProps {
  setError(error: null | Error): void
}

const { Item } = Form

export const Login = ({ setError }: LoginProps) => {
  const { login } = useAuthContext()

  const handleFieldsChange = useCallback(() => setError(null), [setError])
  const handleSubmit = (form: LoginFormFields) => {
    login(form)
      .then(() => message.success('登录成功'))
      .catch(e => {
        setError(e)
      })
  }

  return (
    <Form onFinish={handleSubmit} onFieldsChange={handleFieldsChange}>
      <Item
        name='username'
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder='请输入用户名' autoComplete='false' type='text' />
      </Item>
      <Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
        <Input placeholder='请输入密码' autoComplete='false' type='password' />
      </Item>
      <Item>
        <LongButton type='primary' htmlType='submit'>
          登录
        </LongButton>
      </Item>
    </Form>
  )
}
