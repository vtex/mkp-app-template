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

const ToggleComponent: React.FC<ToggleProps> = props => {
  const toggle = useToggleState({ state: props.state })

  useEffect(() => {
    toggle.setState(props.state ?? false)
  }, [props.state])

  const toggleComponent = (
    <Toggle
      id={props.id}
      value={props.value}
      state={toggle}
      aria-label={props.arialLabel}
      disabled={!props.canEdit}
      onChange={() => {
        props.onChange()
      }}
    />
  )

  const toggleStateAsString = toggle.state === true ? "on" : "off"

  return (
    <>
      {props.title && (
        <Heading csx={{ fontSize: 18 }}> {props.title} </Heading>
      )}
      <Label csx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
        <TooltipComponent
            placement={"left"}
            label={props.tooltip}
        >
          {toggleComponent}
        </TooltipComponent>

        { props.onOffValues[toggleStateAsString] }
      </Label>

      { props.children?.[toggleStateAsString] }
    </>
  )
}

export default ToggleComponent
