import React from "react"
import InputComponent from "../../../components/InputComponent"
import { DefaultProps } from "../../../typings/props"

export interface EmailProps extends DefaultProps {
  setConfig: React.Dispatch<React.SetStateAction<Configuration>>
}

const Email: React.FC<EmailProps> = ({ intl, config, setConfig }) => {

  return (
    <InputComponent
      id={'email'}
      label={'E-mail'}
      canEdit={true}
      initValue={config.email}
      type={'email'}
      required={true}
      tooltip={intl.formatMessage({ id: "admin/app.email.tooltip" })}
      onChange={value => {
          if(value !== undefined){
            setConfig(oldConfig => ({ ...oldConfig, email: value }))
          }
        }
      }
    />
  )
}

export default Email
