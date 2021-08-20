import React from 'react'
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
        <input
          type='text'
          value={param.name}
          onChange={e =>
            setParam({
              ...param,
              name: e.target.value,
            })
          }
        />
        <select
          value={param.personId}
          onChange={e => setParam({ ...param, personId: e.target.value })}
        >
          <option value={''}>负责人</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  )
}
