import {
  RadioGroup,
  Radio,
  Label,
  useRadioState,
  Heading,
} from '@vtex/admin-ui'
import React, { useEffect } from 'react'
import TooltipComponent from './TooltipComponent'

export interface RadioProps {
  id: string
  title: string
  options: RadioItem[]
  tooltip?: string
  canEdit?: boolean
  direction: 'vertical' | 'horizontal'
  onChange: (value: string) => void
}

export interface RadioItem {
  label: string
  value: string
  checked: boolean
  children?: JSX.Element[]
}

const RadioComponent: React.FC<RadioProps> = props => {
  const radioValue = useRadioState()

  useEffect(() => {
    radioValue.setState(
      () => props.options?.filter(x => x.checked)[0]?.value ?? undefined
    )
  }, [props.options])

  var childrenSelected = props.options.find(x => x.checked)?.children;

  const radioComponent = (
    <RadioGroup
      state={radioValue}
      id={props.id}
      orientation={props.direction}
    >
      {props.options.map((item, idx) => (
        <Label key={`${item.label}-${item.value}-${idx}`}>
          <Radio
            value={item.value}
            state={radioValue}
            onClick={() => props.onChange(item.value)}
            checked={item.checked}
            disabled={!props.canEdit}
          />
          {item.label}
        </Label>
      ))}
    </RadioGroup>
  )

  return (
    <>
      <TooltipComponent
        placement={"left"}
        label={props.tooltip}
      >
        <Heading csx={{ fontSize: 18 }}>{props.title}</Heading>
      </TooltipComponent>
      {radioComponent}
      {childrenSelected}
    </>
  )
}

export default RadioComponent
