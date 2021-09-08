import styled from '@emotion/styled'
import { Button, Drawer, DrawerProps, Form, FormInstance, Input } from 'antd'
import { ErrorTypography, LargeSpin } from 'components/common/lib'
import React, { Fragment, useEffect } from 'react'
import { useProjectIdInUrl } from 'screens/project/hooks/use-url'
import { useAddEpic } from 'shared/hooks/use-epics'
import { useEpicsQueryKey } from './hooks/use-utils'
const { useForm } = Form

export const CreateEpic = ({
  onClose,
  visible,
  ...restProps
}: Pick<DrawerProps, 'visible'> & { onClose: () => void }) => {
  const {
    mutateAsync: addEpic,
    isLoading,
    error,
  } = useAddEpic(useEpicsQueryKey())
  const [form] = useForm()
  const projectId = useProjectIdInUrl()

  useEffect(() => {
    form.resetFields()
  }, [visible, form])
  const onFinish = async (values: any) => {
    await addEpic({ ...values, projectId })
    onClose()
  }

  return (
    <Drawer
      visible={visible}
      onClose={onClose}
      destroyOnClose={true}
      width={'100%'}
      {...restProps}
    >
      <Container>
        {isLoading ? (
          <LargeSpin />
        ) : (
          <EpicForm
            error={error}
            form={form}
            isLoading={isLoading}
            onFinish={onFinish}
          />
        )}
      </Container>
    </Drawer>
  )
}

interface IProjectFormProps {
  form: FormInstance | undefined
  error: Error | null
  onFinish: (values: any) => void
  isLoading: boolean
}
const EpicForm = (props: IProjectFormProps) => {
  const { form, error, onFinish, isLoading } = props
  return (
    <Fragment>
      <h1>创建任务组</h1>
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
          rules={[{ required: true, message: '请输入任务组名称' }]}
        >
          <Input placeholder={'请输入任务组名称'} />
        </Form.Item>
        <Form.Item style={{ float: 'right' }}>
          <Button loading={isLoading} type={'primary'} htmlType={'submit'}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
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
