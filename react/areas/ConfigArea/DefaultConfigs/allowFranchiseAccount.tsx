import React, { useState } from 'react'
import ToggleComponent from '../../../components/ToggleComponent'

import type { DefaultProps } from '../../../typings/props'

export interface AllowFranchiseAccountProps extends DefaultProps {
  setConfig: React.Dispatch<React.SetStateAction<Configuration>>
}

const AllowFranchiseAccount: React.FC<AllowFranchiseAccountProps> = ({intl, config, setConfig}) => {
  const [toggleButtonState, setToggleButtonState] = useState(config.allowFranchiseAccounts)

  return (
    <ToggleComponent
    title={intl.formatMessage({id: "admin/app.allow-franchise.title"})}
    id="franchiseAccountToggle"
    state={toggleButtonState}
    canEdit
    onChange={() => {
      setToggleButtonState((previousState) => !previousState)
      setConfig((previousConfig) => {
        const newConfig: Configuration = {...previousConfig, allowFranchiseAccounts: !previousConfig.allowFranchiseAccounts}
        return newConfig
      })
    }}
    onOffValues={{
      on: intl.formatMessage({ id: 'admin/app.integrationStatus.value.on' }),
      off: intl.formatMessage({
        id: 'admin/app.integrationStatus.value.off',
      }),
    }}
     />
  )
}

export default AllowFranchiseAccount
