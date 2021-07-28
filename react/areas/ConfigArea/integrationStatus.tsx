import React from "react"
import ToggleComponent from "../../components/ToggleComponent"
import { DefaultProps } from "./props"

export interface IntegrationStatusProps extends DefaultProps {
  setConfig: React.Dispatch<React.SetStateAction<Configuration>>
  children: { on?: JSX.Element[], off?: JSX.Element[] }
}

const IntegrationStatus: React.FC<IntegrationStatusProps> = ({ intl, config, setConfig, children }) => {
    return (
      <ToggleComponent
        tooltip={intl.formatMessage({ id: "admin/mkp-app-template.integrationStatus.tooltip" })}
        title={intl.formatMessage({ id: 'admin/mkp-app-template.integrationStatus.title' })}
        canEdit={true}
        id={'isIntegrationActive'}
        state={config.active}
        onOffValues={{
          on: intl.formatMessage({ id: 'admin/mkp-app-template.integrationStatus.value.on' }),
          off: intl.formatMessage({ id: 'admin/mkp-app-template.integrationStatus.value.off' }),
        }}
        children={ children }
        onChange={() => {
          setConfig(oldConfig => ({ ...oldConfig, active: !config.active }))
        }}
      />
    )
}

export default IntegrationStatus
