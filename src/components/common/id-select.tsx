import React, { ComponentProps } from 'react'
import { Select } from 'antd'

const { Option } = Select

interface IdSelectProps
  extends Omit<
    ComponentProps<typeof Select>,
    'value' | 'onChange' | 'defaultOptionName' | 'options'
  > {
  value?: number | string | undefined | null
  onChange?: (value?: number) => void
  defaultOptionName?: string
  options?: { name: string; id: number }[]
}

export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={value => onChange?.(toNumber(value))}
      {...restProps}
    >
      {defaultOptionName ? (
        <Option value={0}>{defaultOptionName}</Option>
      ) : null}
      {options?.map(option => (
        <Option value={option.id} key={option.id}>
          {option.name}
        </Option>
      ))}
    </Select>
  )
}

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value))
