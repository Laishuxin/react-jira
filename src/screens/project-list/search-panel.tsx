/** @jsx jsx */
import { jsx } from '@emotion/react'
import { Form, Input } from 'antd'
import { IProject } from '../../types/project-types'
import { UserSelect } from '../../components/content/user-select'

interface SearchPanelProps {
  //users: IUser[]
  param: Partial<Pick<IProject, 'name' | 'personId'>>
  setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel = (props: SearchPanelProps) => {
  const { param, setParam } = props

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
        <UserSelect
          value={param.personId}
          defaultOptionName={'负责人'}
          onChange={value => setParam({ ...param, personId: value })}
        />
      </Form.Item>
    </Form>
  )
}
