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

const SelectComponent: React.FC<SelectProps> = ({
  initialSelectedItem,
  items,
  label,
  onChange,
  canEdit,
  tooltip
}: SelectProps) => {
  const selectState = useSelectState({
    items: items,
    initialSelectedItem: initialSelectedItem,
    onSelectedItemChange: (item) => item ? onChange(item.selectedItem!) : {}
  })

  useEffect(() => {
    selectState.selectItem(initialSelectedItem)
  }, [initialSelectedItem])

  const selectComponent = (
    <Select
      items={items}
      state={selectState}
      label={label}
      disabled={!canEdit ?? false}
      block
    />
  )

  return (
    <TooltipComponent
      placement={"left"}
      label={tooltip}
    >
      {selectComponent}
    </TooltipComponent>
  )
}

export default SelectComponent
