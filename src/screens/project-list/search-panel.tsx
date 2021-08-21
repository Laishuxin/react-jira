/** @jsx jsx */
import { jsx } from '@emotion/react'
import React from 'react'
import { Form, Input, Select } from 'antd'
import { IParam, IUserList } from 'types'

interface IPropTypes {
  param: IParam
  users: IUserList
  setParam: React.Dispatch<IPropTypes['param']>
}

export const SearchPanel = (props: IPropTypes) => {
  const { param, setParam, users } = props

  return (
    <Form css={{ marginBottom: '2rem' }} layout='inline'>
      <Form.Item className='form-item'>
        <Input
          placeholder='项目名'
          type='text'
          value={param.name}
          onChange={e =>
            setParam({
              ...param,
              name: e.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={value => setParam({ ...param, personId: value })}
        >
          <Select.Option value={''}>负责人</Select.Option>
          {users.map(user => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}
