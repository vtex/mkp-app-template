import type { StyleProp } from '@vtex/admin-ui'
import { Tooltip } from '@vtex/admin-ui'
import React from 'react'

export interface TooltipProps {
  label?: string
  placement: 'left' | 'right'
  csx?: StyleProp
}

const TooltipComponent: React.FC<TooltipProps> = ({
  placement,
  label,
  csx,
  children,
}) => {
  if (label) {
    return (
      <Tooltip label={label} placement={placement} csx={csx}>
        {children as JSX.Element}
      </Tooltip>
    )
  }

  return <> {children} </>
}

export default TooltipComponent
