import { Button, Spin, Typography } from 'antd'
import styled from '@emotion/styled'
import React from 'react'
import { DevTools } from 'jira-dev-tool'

// container
export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 100vh;
`

export const ScreenContainer = styled('div')`
  padding: 3.2rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const FullPage = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`

export const Row = styled('div')<{
  gap?: number | boolean
  between?: boolean
  marginBottom?: number
}>`
  display: flex;
  align-items: center;
  justify-content: ${props => (props.between ? 'space-between' : undefined)};
  margin-bottom: ${props => props.marginBottom + 'rem'};

  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${props =>
      typeof props.gap === 'number'
        ? props.gap + 'rem'
        : props.gap
        ? '2rem'
        : undefined};
  }
`

export const LargeSpin = (props: React.ComponentProps<typeof Spin>) => {
  return (
    <Spin
      size={'large'}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      {...props}
    />
  )
}

// buttons
export const NoPaddingButton = styled(Button)`
  padding: 0;
`
export const LongButton = styled(Button)`
  width: 100%;
`
export const LinkButton = (props: React.ComponentProps<typeof Button>) => {
  return <NoPaddingButton type='link' {...props} />
}

// error
interface ErrorTypographyProps
  extends React.ComponentProps<typeof Typography.Text> {
  error: Error | unknown
}

const isError = (error: any): error is Error =>
  error && error.message !== null && error.message !== undefined
export const ErrorTypography = ({
  error,
  ...restProps
}: ErrorTypographyProps) => {
  return isError(error) ? (
    <Typography.Text type={'danger'} {...restProps}>
      {error.message}
    </Typography.Text>
  ) : null
}

export const FullPageErrorFeedback = ({ error }: { error: Error | null }) => {
  return (
    <FullPage>
      {error ? <ErrorTypography error={error} /> : null}
      <DevTools />
    </FullPage>
  )
}

// loading
export const FullPageLoading = () => {
  return (
    <FullPage>
      <LargeSpin />
    </FullPage>
  )
}
