import React, { useCallback } from 'react'
import { Form, Input, message } from 'antd'
import { LongButton } from 'components/common/button'
import { useAuthContext } from 'context/auth-context'
interface RegisterFormFields {
  username: string
  password: string
  cpassword: string
}
interface RegisterProps {
  setError(error: null | Error): void
}

const { Item } = Form

export const Register = ({ setError }: RegisterProps) => {
  const { register } = useAuthContext()

  const handleFieldsChange = useCallback(() => setError(null), [setError])
  const handleSubmit = (values: RegisterFormFields) => {
    const { username, password, cpassword } = values
    if (cpassword !== password) {
      return setError(new Error('两次密码输入不一致'))
    }
    register({ username, password })
      .then(() => message.success('注册成功'))
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
      <Item
        name='cpassword'
        rules={[{ required: true, message: '请再次输入密码' }]}
      >
        <Input
          placeholder='请再次输入密码'
          autoComplete='false'
          type='password'
        />
      </Item>
      <Item>
        <LongButton type='primary' htmlType='submit'>
          注册
        </LongButton>
      </Item>
    </Form>
  )
}
