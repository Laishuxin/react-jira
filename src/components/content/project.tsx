import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkButton } from 'components/common/button'
import { open, close, selectProjectDrawer } from 'store/slice/project-drawer'
import { useAppSelector } from 'hooks'
import { Drawer, List } from 'antd'
import { selectProjectList } from 'store/slice/project-list'

export const CreateProject = () => {
  const dispatch = useDispatch()
  const handleClick = useCallback(() => {
    dispatch(open())
  }, [dispatch])
  return <LinkButton onClick={handleClick}>创建项目</LinkButton>
}

interface ProjectDrawerProps extends React.ComponentProps<typeof Drawer> {}
export const ProjectDrawer = (props: ProjectDrawerProps) => {
  const isOpen = useAppSelector(selectProjectDrawer)
  const dispatch = useDispatch()
  const handleClose = useCallback(() => {
    dispatch(close())
  }, [dispatch])

  return (
    <Drawer
      className='project-drawer'
      width='100%'
      height='100%'
      visible={isOpen}
      onClose={handleClose}
      {...props}
    >
      <h1>project drawer</h1>
    </Drawer>
  )
}

export const PinProjects = () => {
  const projectList = useSelector(selectProjectList)
  console.log(projectList)
  const projects = projectList.filter(item => item.pin)
  return (
    <List>
      {projects.map(project => (
        <List.Item key={project.id}>
          <List.Item.Meta title={project.name} />
        </List.Item>
      ))}
    </List>
  )
}
