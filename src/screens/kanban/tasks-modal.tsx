import React, { useEffect } from 'react'
import { Form, FormInstance, Input, Modal } from 'antd'
import { useTasksModal } from 'shared/hooks/use-task-modal'
import { useEditTask } from 'shared/hooks/use-tasks'
import { useTasksQueryKey } from './hooks/use-url'
import { UserSelect } from 'components/content/user-select'
import { TaskTypesSelect } from 'components/content/task-types-select'
import { ITask } from 'types/task'
import { ErrorTypography, LargeSpin } from 'components/common/lib'
const { useForm, Item } = Form
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

export const TasksModal = () => {
  const {
    isLoading,
    isTasksModalOpen,
    close,
    editingTask,
    isError,
    // editingTaskId,
  } = useTasksModal()

  const {
    mutateAsync: editTask,
    isLoading: isEditTaskLoading,
    error: editTaskError,
    isError: isEditingTaskError,
  } = useEditTask(useTasksQueryKey())
  const [form] = useForm()
  const modalClose = () => {
    form.resetFields()
    close()
  }

  const modalOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() })
    modalClose()
  }

  useEffect(() => {
    form.setFieldsValue(editingTask)
  }, [editingTask, form])

    return (
    <Modal
      okText={'确认'}
      cancelText={'取消'}
      onCancel={modalClose}
      onOk={modalOk}
      confirmLoading={isEditTaskLoading}
      title={'编辑任务'}
      visible={isTasksModalOpen}
      // forceRender={true}
    >
      {isError ? <ErrorTypography error={editTaskError} /> : null}
      {isLoading ? (
        <LargeSpin />
      ) : (
        <EditingTasksForm editingTask={editingTask} form={form} />
      )}
    </Modal>
  )
}

const EditingTasksForm = ({
  editingTask,
  form,
}: {
  editingTask: ITask | undefined
  form: FormInstance<any> | undefined
}) => {
  return (
    <Form {...layout} form={form} initialValues={editingTask}>
      <Item
        label={'任务名'}
        name={'name'}
        rules={[{ required: true, message: '请输入任务名' }]}
      >
        <Input placeholder={'请输入任务名'} />
      </Item>
      <Item label={'经办人'} name={'processorId'}>
        <UserSelect defaultOptionName={'经办人'} />
      </Item>
      <Item label={'类型'} name={'typeId'}>
        <TaskTypesSelect />
      </Item>
    </Form>
  )
}