import type { StyleProp } from '@vtex/admin-ui'
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
  csx?: StyleProp
}

export interface RadioItem {
  label: string
  value: string
  checked: boolean
  children?: JSX.Element[]
}

const RadioComponent: React.FC<RadioProps> = ({
  direction,
  id,
  onChange,
  options,
  title,
  canEdit,
  tooltip,
  csx,
}: RadioProps) => {
  const radioValue = useRadioState()

  useEffect(() => {
    radioValue.setState(
      () => options?.filter((x) => x.checked)[0]?.value ?? undefined
    )
  }, [options])

  const childrenSelected = options.find((x) => x.checked)?.children

  const radioComponent = (
    <RadioGroup state={radioValue} id={id} orientation={direction} csx={csx}>
      {options.map((item, idx) => (
        <Label key={`${item.label}-${item.value}-${idx}`}>
          <Radio
            value={item.value}
            state={radioValue}
            onClick={() => onChange(item.value)}
            checked={item.checked}
            disabled={!canEdit}
          />
          {item.label}
        </Label>
      ))}
    </RadioGroup>
  )

  return (
    <>
      <TooltipComponent placement="left" label={tooltip}>
        <Heading csx={{ fontSize: 18 }}>{title}</Heading>
      </TooltipComponent>
      {radioComponent}
      {childrenSelected}
    </>
  )
}

export default RadioComponent
