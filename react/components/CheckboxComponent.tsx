import type { CheckboxStateReturn, StyleProp } from '@vtex/admin-ui'
import {
  CheckboxGroup,
  Checkbox,
  Label,
  Heading,
  useCheckboxState,
} from '@vtex/admin-ui'
import React, { useEffect } from 'react'

import TooltipComponent from './TooltipComponent'

export interface CheckboxProps {
  id: string
  title: string
  options: CheckboxItem[]
  tooltip?: string
  direction: 'vertical' | 'horizontal'
  onChange: (value: string[]) => void
  csx?: StyleProp
}

export interface CheckboxItem {
  label: string
  value: string
  checked: boolean
  enabled?: boolean
}

const checkboxOnClick = (
  item: CheckboxItem,
  checkboxValue: CheckboxStateReturn,
  onChange: (value: string[]) => void
) => {
  const state = checkboxValue.state as string[]
  const exists = state.find((s) => s === item.value)

  if (exists) {
    onChange(state.filter((s) => s !== item.value))
  } else {
    onChange([...state, item.value])
  }
}

const CheckboxComponent: React.FC<CheckboxProps> = ({
  id,
  direction,
  tooltip,
  title,
  options,
  onChange,
  csx,
}: CheckboxProps) => {
  const checkboxValue = useCheckboxState({ state: [] })

  useEffect(() => {
    checkboxValue.setState(() =>
      options.filter((item) => item.checked).map((item) => item.value)
    )
  }, [options])

  const checkboxComponent = (
    <CheckboxGroup id={id} orientation={direction} csx={csx}>
      {options.map((item, idx) => (
        <Label key={`${item.label}-${item.value}-${idx}`}>
          <Checkbox
            value={item.value}
            state={checkboxValue}
            onClick={() => checkboxOnClick(item, checkboxValue, onChange)}
            checked={item.checked}
            disabled={!(item.enabled ?? true)}
          />
          {item.label}
        </Label>
      ))}
    </CheckboxGroup>
  )

  return (
    <>
      <TooltipComponent label={tooltip} placement="left">
        <Heading csx={{ fontSize: 18 }}>{title}</Heading>
      </TooltipComponent>
      {checkboxComponent}
    </>
  )
}

export default CheckboxComponent
