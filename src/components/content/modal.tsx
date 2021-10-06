import React from 'react'
import { Modal as AntdModal } from 'antd'
export const Modal = (props: React.ComponentProps<typeof AntdModal>) => {
  return <AntdModal cancelText='取消' okText='确定' {...props} />
}
