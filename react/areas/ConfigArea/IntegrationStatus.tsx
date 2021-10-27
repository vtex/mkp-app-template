import React from 'react'

import ToggleComponent from '../../components/ToggleComponent'
import type { DefaultProps } from '../../typings/props'

export interface IntegrationStatusProps extends DefaultProps {
  setConfig: React.Dispatch<React.SetStateAction<Configuration>>
  children: { on?: JSX.Element[]; off?: JSX.Element[] }
}

const IntegrationStatus: React.FC<IntegrationStatusProps> = ({
  intl,
  config,
  setConfig,
  children,
}) => {
  return (
    <ToggleComponent
      key="ToggleComponent"
      tooltip={intl.formatMessage({
        id: 'admin/app.integrationStatus.tooltip',
      })}
      title={intl.formatMessage({ id: 'admin/app.integrationStatus.title' })}
      canEdit
      id="isIntegrationActive"
      state={config.active}
      onOffValues={{
        on: intl.formatMessage({ id: 'admin/app.integrationStatus.value.on' }),
        off: intl.formatMessage({
          id: 'admin/app.integrationStatus.value.off',
        }),
      }}
      onChange={() => {
        setConfig((oldConfig) => ({ ...oldConfig, active: !config.active }))
      }}
    >
      {children}
    </ToggleComponent>
  )
}

export default IntegrationStatus
