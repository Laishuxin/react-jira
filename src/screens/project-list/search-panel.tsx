import React from 'react'
import { Input, Select } from 'antd'
import { IParam, IUserList } from 'types'

interface IPropTypes {
  param: IParam
  users: IUserList
  setParam: React.Dispatch<IPropTypes['param']>
}

export const SearchPanel = (props: IPropTypes) => {
  const { param, setParam, users } = props

  return (
    <form>
      <div className='form-item'>
        <Input
          type='text'
          value={param.name}
          onChange={e =>
            setParam({
              ...param,
              name: e.target.value,
            })
          }
        />
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
      </div>
    </form>
  )
}
