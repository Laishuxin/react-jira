import React, {
  Component,
  Fragment,
  PropsWithChildren,
  ReactElement,
} from 'react'

type FallbackRender = (props: { error: Error | null }) => ReactElement

interface IState {
  error: Error | null
}

export class ErrorBoundary extends Component<
  PropsWithChildren<{ fallbackRender: FallbackRender }>,
  IState
> {
  state: IState = { error: null }

  static getDerivedStateFromError(error: Error | null) {
    return { error }
  }

  render() {
    const { error } = this.state
    const { fallbackRender, children } = this.props
    if (error) return fallbackRender({ error })
    return children
  }
}
