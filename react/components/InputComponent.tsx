import { Input, InputType, StyleProp } from '@vtex/admin-ui'
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
  name: string
  initValue: string
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
  name,
  type,
  csx,
  onChange,
  required,
  tooltip
}: InputProps) => {
  const intl = useIntl()
  const [field, setField] = useState(initValue)

  useEffect(() => {
    setField(initValue)
  }, [initValue])

  const inputComponent = (
    <Input
      id={id}
      label={name}
      value={field}
      disabled={!canEdit}
      type={type}
      onChange={(e: Event) => {
        canEdit ? onChange!(e?.target?.value ?? '') : {}
      }}
      errorMessage={intl.formatMessage({ id: "admin/app.input.requiredMessage" })}
      error={(required ?? false) && !field}
      onClear={!canEdit ? undefined : () => onChange!('')}
      csx={csx}
    />
  )

  return (
    <TooltipComponent
      label={tooltip}
      placement="left"
    >
      {inputComponent}
    </TooltipComponent>
  )
}

export default InputComponent
