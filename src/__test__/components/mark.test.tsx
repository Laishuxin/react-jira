import React from 'react'
import { render, screen } from '@testing-library/react'
import { Mark } from 'components/common/mark'

describe('component', () => {
  it('should render the correct Mark component', () => {
    const HIGH_LIGHT_COLOR = '#246AFD'
    const name = '快递管理'
    const keyword = '管理'

    render(<Mark name={name} keyword={keyword} />)
    const targetEl = screen.getByText(keyword)
    const otherEl = screen.getByText('快递')
    expect(targetEl).toBeInTheDocument()
    expect(otherEl).toBeInTheDocument()
    expect(targetEl).toHaveStyle('color: ' + HIGH_LIGHT_COLOR)
    expect(otherEl).not.toHaveStyle('color: ' + HIGH_LIGHT_COLOR)
  })
})
