import type { InputType, StyleProp } from '@vtex/admin-ui'
import { Input } from '@vtex/admin-ui'
import React, { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'

import TooltipComponent from './TooltipComponent'

interface Target {
  value?: string
}

interface Event {
  target?: Target
}

export interface InputProps {
  id: string
  label: string
  initValue: string | undefined
  canEdit: boolean
  type: InputType
  tooltip?: string
  required?: boolean
  onChange?: (value: string) => void
  csx?: StyleProp
}

const InputComponent: React.FC<InputProps> = ({
  id,
  initValue,
  canEdit,
  label,
  type,
  csx,
  onChange,
  required,
  tooltip,
}: InputProps) => {
  const intl = useIntl()
  const [field, setField] = useState(initValue)

  useEffect(() => {
    setField(initValue)
  }, [initValue])

  const inputComponent = (
    <Input
      id={id}
      label={label}
      value={field}
      disabled={!canEdit}
      type={type}
      onChange={(e: Event) => {
        const inputValue = e?.target?.value

        setField(inputValue)
        canEdit ? onChange!(inputValue ?? '') : {}
      }}
      errorMessage={intl.formatMessage({
        id: 'admin/app.input.requiredMessage',
      })}
      error={(required ?? false) && !field}
      onClear={!canEdit ? undefined : () => onChange!('')}
      csx={csx}
    />
  )

  return (
    <TooltipComponent label={tooltip} placement="left">
      {inputComponent}
    </TooltipComponent>
  )
}

export default InputComponent
