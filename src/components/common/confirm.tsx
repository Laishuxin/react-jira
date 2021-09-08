import { Modal, ModalFuncProps } from 'antd'
const { confirm: aConfirm } = Modal

export const confirm = (props: ModalFuncProps) => {
  const { title = '确认删除吗？', ...restProps } = props
  return aConfirm({
    cancelText: '取消',
    okText: '确认',
    title,
    ...restProps,
  })
}
