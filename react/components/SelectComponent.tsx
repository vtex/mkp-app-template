import React, { useEffect } from 'react'
import type { StyleProp } from '@vtex/admin-ui'
import { Select, useSelectState } from '@vtex/admin-ui'
import { useIntl } from 'react-intl'

import TooltipComponent from './TooltipComponent'

export interface SelectProps {
  items: string[]
  initialSelectedItem: string
  label: string
  canEdit?: boolean
  tooltip?: string
  onChange: (value: string | undefined) => void
  csx?: StyleProp
  required?: boolean
}

const SelectComponent: React.FC<SelectProps> = ({
  initialSelectedItem,
  items,
  label,
  onChange,
  canEdit,
  tooltip,
  csx,
  required,
}: SelectProps) => {
  const selectState = useSelectState({
    items,
    initialSelectedItem,
    onSelectedItemChange: (item) => (item ? onChange(item.selectedItem!) : {}),
  })

  const intl = useIntl()

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
      errorMessage={intl.formatMessage({
        id: 'admin/app.input.requiredMessage',
      })}
      error={(required ?? false) && !selectState.selectedItem}
    />
  )

  return (
    <TooltipComponent placement="left" label={tooltip}>
      {selectComponent}
    </TooltipComponent>
  )
}

export default SelectComponent
