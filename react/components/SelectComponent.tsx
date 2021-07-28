import React, { useEffect } from 'react'
import { Select, useSelectState } from '@vtex/admin-ui'
import TooltipComponent from './TooltipComponent'

export interface SelectProps {
  items: string[]
  initialSelectedItem: string
  label: string
  canEdit?: boolean
  tooltip?: string
  onChange: (value: string | undefined) => void
}

const SelectComponent: React.FC<SelectProps> = props => {
  const selectState = useSelectState({
    items: props.items,
    initialSelectedItem: props.initialSelectedItem,
    onSelectedItemChange: (item) => item ? props.onChange(item.selectedItem!) : {}
  })

  useEffect(() => {
    selectState.selectItem(props.initialSelectedItem)
  }, [props.initialSelectedItem])

  const selectComponent = (
    <Select
      items={props.items}
      state={selectState}
      label={props.label}
      disabled={!props.canEdit ?? false}
      block
    />
  )

  return (
    <TooltipComponent
      placement={"left"}
      label={props.tooltip}
    >
      {selectComponent}
    </TooltipComponent>
  )
}

export default SelectComponent
