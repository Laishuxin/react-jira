import React from 'react'
import { Typography } from 'antd'
const { Text } = Typography
export const ErrorText = (
  props: React.ComponentProps<typeof Text> & { error?: Error | null },
) => {
  return (
    <Text type='danger' {...props}>
      {props.error ? props.error.message : null}
    </Text>
  )
}
