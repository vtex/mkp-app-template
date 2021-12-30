import React from 'react'

import type { DefaultProps } from '../../../typings/props'
import AllowFranchiseAccounts from '../CustomConfigs/AllowFranchiseAccounts'

export interface CustomConfigsProps extends DefaultProps {
  setConfig: React.Dispatch<React.SetStateAction<Configuration>>
}

const CustomConfigsArea: React.FC<CustomConfigsProps> =  ({
  config,
  setConfig,
  intl
}) => {
  return (
    <div>
      <AllowFranchiseAccounts intl={intl} config={config} setConfig={setConfig} />
    </div>
  )
}

export default CustomConfigsArea
