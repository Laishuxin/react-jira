import React, { Fragment, useEffect } from 'react'
import { Form, Drawer, Input, Button } from 'antd'
import { useProjectModal } from 'shared/hooks/use-project-modal'
import { ErrorTypography, LargeSpin } from 'components/common/lib'
import { UserSelect } from './user-select'
import { useEditProject, useAddProject } from 'shared/hooks/use-projects'
import styled from '@emotion/styled'
import { useProjectsQueryKey } from 'screens/project-list/hooks/use-projects-query-key'
const { useForm } = Form

export const ProjectModal = () => {
  const {
    isProjectModalOpen,
    close,
    editingProject,
    isEditingProject,
    isLoading,
  } = useProjectModal()

  const useMutateProject = isEditingProject ? useEditProject : useAddProject
  const {
    mutateAsync,
    isLoading: isMutateLoading,
    error,
  } = useMutateProject(useProjectsQueryKey())
  const [form] = useForm()
  const modalClose = () => {
    form.resetFields()
    close()
  }

  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      modalClose()
    })
  }

  useEffect(() => {
    if (isEditingProject && editingProject) {
      form.setFieldsValue(editingProject)
    } else {
      // form.resetFields()
    }
  }, [editingProject, form, isEditingProject])

  const title = isEditingProject ? '编辑项目' : '创建项目'

  const ProjectForm = () => {
    return (
      <Fragment>
        <h1>{title}</h1>
        <ErrorTypography error={error} />
        <Form
          form={form}
          layout={'vertical'}
          style={{ width: '40rem' }}
          onFinish={onFinish}
        >
          <Form.Item
            label={'名称'}
            name={'name'}
            rules={[{ required: true, message: '请输入项目名称' }]}
          >
            <Input placeholder={'请输入项目名称'} />
          </Form.Item>

          <Form.Item
            label={'部门'}
            name={'organization'}
            rules={[{ required: true, message: '请输入部门名称' }]}
          >
            <Input placeholder={'请输入部门名称'} />
          </Form.Item>

          <Form.Item label={'负责人'} name={'personId'}>
            <UserSelect defaultOptionName={'负责人'} />
          </Form.Item>

          <Form.Item style={{ float: 'right' }}>
            <Button
              loading={isMutateLoading}
              type={'primary'}
              htmlType={'submit'}
            >
              提交
            </Button>
          </Form.Item>
        </Form>
      </Fragment>
    )
  }

  return (
    <Drawer
      forceRender={true}
      onClose={modalClose}
      width={'100%'}
      visible={isProjectModalOpen}
    >
      <Container>{isLoading ? <LargeSpin /> : <ProjectForm />}</Container>
    </Drawer>
  )
}

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`
