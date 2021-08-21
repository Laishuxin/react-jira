import styled from '@emotion/styled'
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 100vh;
`
export const Row = styled.div<{
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
