import {
  CheckboxGroup,
  Checkbox,
  Label,
  Heading,
  useCheckboxState,
  CheckboxStateReturn,
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
}

export interface CheckboxItem {
  label: string
  value: string
  checked: boolean
  enabled?: boolean
}

const checkboxOnClick = (item: CheckboxItem,
                        checkboxValue: CheckboxStateReturn,
                        props: React.PropsWithChildren<CheckboxProps>) => {
  
                          let state = checkboxValue.state as string[]
  const exists = state.find(s => s === item.value)

  if (exists) {
    state = state.filter(s => s !== item.value)
  } else {
    state = [...state, item.value]
  }

  props.onChange(state)
}

const CheckboxComponent: React.FC<CheckboxProps> = props => {
  const checkboxValue = useCheckboxState({ state: [] })

  useEffect(() => {
    checkboxValue.setState(() =>
      props.options
        .filter(item => item.checked)
        .map(item => item.value)
    )
  }, [props.options])

  const checkboxComponent = (
    <CheckboxGroup id={props.id} orientation={props.direction}>
      {props.options.map((item, idx) => (
        <Label key={`${item.label}-${item.value}-${idx}`}>
          <Checkbox
            value={item.value}
            state={checkboxValue}
            onClick={ () => checkboxOnClick(item, checkboxValue, props) }
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
      <TooltipComponent
        label={props.tooltip}
        placement="left"
      >
        <Heading csx={{ fontSize: 18 }}>{props.title}</Heading>
      </TooltipComponent>
      {checkboxComponent}
    </>
  )
}

export default CheckboxComponent
