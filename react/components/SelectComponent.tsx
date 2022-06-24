import React, { useEffect } from 'react'
import type { StyleProp } from '@vtex/admin-ui'
import { Select, useSelectState } from '@vtex/admin-ui'

import TooltipComponent from './TooltipComponent'

export interface SelectProps {
  items: string[]
  initialSelectedItem: string
  label: string
  canEdit?: boolean
  tooltip?: string
  onChange: (value: string | undefined) => void
  csx?: StyleProp
}

const SelectComponent: React.FC<SelectProps> = ({
  initialSelectedItem,
  items,
  label,
  onChange,
  canEdit,
  tooltip,
  csx,
}: SelectProps) => {
  const selectState = useSelectState({
    items,
    initialSelectedItem,
    onSelectedItemChange: (item) => (item ? onChange(item.selectedItem!) : {}),
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
      csx={csx}
    />
  )

  return (
    <TooltipComponent placement="left" label={tooltip}>
      {selectComponent}
    </TooltipComponent>
  )
}

export default SelectComponent
