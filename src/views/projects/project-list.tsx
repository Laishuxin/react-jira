import React from 'react'
import { Popover, Table, TableProps, Menu, Dropdown, Divider } from 'antd'
import { Project } from 'typings/project'
import { LinkButton } from 'components/common/button'
import { format } from 'shared/utils'
import { Pin } from 'components/content/pin'
import { User } from 'typings/user'
import { ColumnsType } from 'antd/lib/table'

export interface ProjectListProps extends TableProps<Project> {
  users: User[]
  projectList: Project[]
  editProject?(id: Project['id'], payload: Partial<Project>): void
}

export const ProjectList = ({
  users,
  projectList,
  editProject,
  ...restProps
}: ProjectListProps) => {
  const columns: ColumnsType<Project> = [
    {
      title: <Pin disabled />,
      dataIndex: 'pin',
      render: (pin, project) => (
        <Pin
          pin={pin}
          onChange={newPinStatus =>
            editProject?.(project.id, { pin: newPinStatus })
          }
        />
      ),
    },
    {
      title: '名称',
      sorter: (a, b) => a.name.localeCompare(b.name),
      dataIndex: 'name',
      render: (value, project) => {
        return (
          <LinkButton
            onClick={() => {
              // TODO(rushui 2021-10-05): 完成跳转
              console.log(project)
            }}
          >
            {value}
          </LinkButton>
        )
      },
    },
    {
      title: '部门',
      dataIndex: 'organization',
    },
    {
      title: '负责人',
      dataIndex: 'personId',
      render: value => users.find(user => user.id === value)?.name,
    },
    {
      title: '创建时间',
      dataIndex: 'created',
      render: value => format(value),
    },
    {
      title: '操作',
      render: (_, project) => <Edit project={project} />,
    },
  ]
  return (
    <Table
      className='projects-project-list'
      rowKey='id'
      pagination={false}
      sticky
      columns={columns}
      dataSource={projectList}
      {...restProps}
    />
  )
}

const Edit = ({ project }: { project: Project }) => {
  // TODO(rushui 2021-10-06): 删除编辑和删除功能
  return (
    <Dropdown
      overlay={
        <Menu style={{ width: '12rem', textAlign: 'center' }}>
          <Menu.Item key='edit'>
            <LinkButton>编辑</LinkButton>
          </Menu.Item>
          <Menu.Item key='delete'>
            <LinkButton>删除</LinkButton>
          </Menu.Item>
        </Menu>
      }
    >
      <LinkButton>...</LinkButton>
    </Dropdown>
  )
}
