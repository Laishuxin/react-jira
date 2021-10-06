import React from 'react'
import { Rate } from 'antd'

export interface PinProps
  extends Omit<React.ComponentProps<typeof Rate>, 'onChange'> {
  pin?: boolean
  onChange?(pin: boolean): void
}
export const Pin = ({ pin = false, onChange, ...restProps }: PinProps) => {
  return (
    <Rate
      count={1}
      value={Number(pin)}
      onChange={count => onChange?.(Boolean(count))}
      {...restProps}
    />
  )
}
