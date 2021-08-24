import { Heading, Label, Toggle, useToggleState } from '@vtex/admin-ui'
import React, { useEffect } from 'react'
import TooltipComponent from './TooltipComponent'

export interface ToggleProps {
  title?: string
  id: string
  arialLabel?: string
  tooltip?: string
  state: boolean
  value?: string
  canEdit?: boolean
  onOffValues: { on: string; off: string }
  children?: { on?: JSX.Element[], off?: JSX.Element[] }
  onChange: () => void
}

const ToggleComponent: React.FC<ToggleProps> = ({
  id,
  onChange,
  onOffValues,
  state,
  arialLabel,
  canEdit,
  children,
  title,
  tooltip,
  value
}: ToggleProps) => {
  const toggle = useToggleState({ state: state })

  useEffect(() => {
    toggle.setState(state ?? false)
  }, [state])

  const toggleComponent = (
    <Toggle
      id={id}
      value={value}
      state={toggle}
      aria-label={arialLabel}
      disabled={!canEdit}
      onChange={() => {
        onChange()
      }}
    />
  )

  const toggleStateAsString = toggle.state === true ? "on" : "off"

  return (
    <>
      {title && (
        <Heading csx={{ fontSize: 18 }}> {title} </Heading>
      )}
      <Label csx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
        <TooltipComponent
            placement={"left"}
            label={tooltip}
        >
          {toggleComponent}
        </TooltipComponent>

        { onOffValues[toggleStateAsString] }
      </Label>

      { children?.[toggleStateAsString] }
    </>
  )
}

export default ToggleComponent
