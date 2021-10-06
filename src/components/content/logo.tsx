import React from 'react'
import { LinkButton } from 'components/common/button'
import { navigateOrigin } from 'shared/utils'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
export default function Logo() {
  return (
    <LinkButton onClick={navigateOrigin}>
      <SoftwareLogo style={{ width: '18rem', color: '#2684ff' }} />
    </LinkButton>
  )
}
