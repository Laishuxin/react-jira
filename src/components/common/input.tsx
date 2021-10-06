import React, { useState } from 'react'
import { Input as AntdInput } from 'antd'
import { useDebounce, DebounceOptions } from 'hooks/use-debounce'

export interface InputProps
  extends Omit<React.ComponentProps<typeof AntdInput>, 'onChange'> {
  onChange?(newValue: string): void
  debounce?: boolean
  debounceOptions?: DebounceOptions
  initValue?: string
}

export const Input = (props: InputProps) => {
  const {
    onChange: _onChange = (_: string) => {},
    debounce = false,
    debounceOptions,
    initValue = '',
    ...restProps
  } = props

  const [value, setValue] = useState(initValue)
  const debounceOnChange = useDebounce(_onChange, debounceOptions)
  let onChange = debounce ? debounceOnChange : _onChange

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setValue(value)
    onChange(value)
  }
  return <AntdInput value={value} onChange={handleChange} {...restProps} />
}
