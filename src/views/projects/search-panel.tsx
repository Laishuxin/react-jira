import React from 'react'
import { Form } from 'antd'
import { Input } from 'components/common/input'
import { Project } from 'typings/project'
import { UserSelect } from 'components/content/user'
const { Item } = Form

interface SearchPanelProps {
  params: Partial<Project>
  setParams(params: Partial<Project>): void
}
export const SearchPanel = ({ params, setParams }: SearchPanelProps) => {
  const handleChange = (value?: number) => {
    // cancel default value.
    value = value !== 0 ? value : undefined
    setParams({ ...params, personId: value })
  }
  return (
    <Form className='projects-search-panel' layout='inline'>
      <Item>
        <Input
          placeholder='项目名'
          debounce
          debounceOptions={{ wait: 200 }}
          onChange={name => setParams({ name })}
          initValue={params.name}
        />
      </Item>
      <Item>
        <UserSelect
          value={params.personId}
          defaultOptionName='负责人'
          onChange={handleChange}
        />
      </Item>
    </Form>
  )
}
