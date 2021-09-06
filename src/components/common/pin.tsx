import React from 'react'
import { Rate } from 'antd'
import { ComponentProps } from 'react'

interface IPinProps extends ComponentProps<typeof Rate> {
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
}

export const Pin = ({ checked, onCheckedChange, ...restProps }: IPinProps) => {
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={num => onCheckedChange?.(!!num)}
      {...restProps}
    />
  )
}
