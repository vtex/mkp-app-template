import type { StyleProp } from '@vtex/admin-ui'
import { Heading, Label, Toggle, useToggleState } from '@vtex/admin-ui'
import React, { useEffect } from 'react'

import TooltipComponent from './TooltipComponent'

export interface ToggleProps {
  title?: string
  id: string
  tooltip?: string
  state: boolean
  canEdit?: boolean
  onOffValues: { on: string; off: string }
  children?: { on?: JSX.Element[]; off?: JSX.Element[] }
  onChange?: () => void
  csx?: StyleProp
}

const ToggleComponent: React.FC<ToggleProps> = ({
  id,
  onChange,
  onOffValues,
  state,
  canEdit,
  children,
  title,
  tooltip,
  csx,
}: ToggleProps) => {
  const toggle = useToggleState({ state })

  useEffect(() => {
    toggle.setState(state ?? false)
  }, [state])

  const toggleComponent = (
    <Toggle
      id={id}
      state={toggle}
      disabled={!canEdit}
      onChange={() => {
        if (onChange) onChange!()
      }}
      csx={csx}
    />
  )

  const toggleStateAsString = toggle.state === true ? 'on' : 'off'

  return (
    <>
      {title && <Heading csx={{ fontSize: 18 }}> {title} </Heading>}
      <Label csx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
        <TooltipComponent placement="left" label={tooltip}>
          {toggleComponent}
        </TooltipComponent>

        {onOffValues[toggleStateAsString]}
      </Label>

      {children?.[toggleStateAsString]}
    </>
  )
}

export default ToggleComponent
