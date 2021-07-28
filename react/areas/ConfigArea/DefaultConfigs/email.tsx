import React from "react"
import InputComponent from "../../../components/InputComponent"
import { DefaultProps } from "../props"

export interface EmailProps extends DefaultProps {
  config: Configuration
  setConfig: React.Dispatch<React.SetStateAction<Configuration>>
}

const Email: React.FC<EmailProps> = ({ intl, config, setConfig }) => {

  return (
    <InputComponent
      id={'email'}
      name={'E-mail'}
      canEdit={true}
      initValue={config.email}
      type={'email'}
      required={true}
      tooltip={intl.formatMessage({ id: "admin/mkp-app-template.email.tooltip" })}
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
