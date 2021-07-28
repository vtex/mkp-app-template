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

const InputComponent: React.FC<InputProps> = props => {
  const intl = useIntl()
  const [field, setField] = useState(props.initValue)

  useEffect(() => {
    setField(props.initValue)
  }, [props.initValue])

  const inputComponent = (
    <Input
      id={props.id}
      label={props.name}
      value={field}
      disabled={!props.canEdit}
      type={props.type}
      onChange={(e: Event) => {
        props.canEdit ? props.onChange!(e?.target?.value ?? '') : {}
      }}
      errorMessage={intl.formatMessage({ id: "admin/mkp-app-template.input.requiredMessage" })}
      error={(props.required ?? false) && !field}
      onClear={!props.canEdit ? undefined : () => props.onChange!('')}
      csx={props.csx}
    />
  )

  return (
    <TooltipComponent
      label={props.tooltip}
      placement="left"
    >
      {inputComponent}
    </TooltipComponent>
  )
}

export default InputComponent
