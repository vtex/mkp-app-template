import React from 'react'
import { Box } from '@vtex/admin-ui'

import Affiliate from './affiliate'
import SearchEndpoint from './endpoint'
import SalesChannel from './salesChannel'
import Email from './email'
import type { DefaultProps } from '../../../typings/props'

export interface DefaultConfigsProps extends DefaultProps {
  setConfig: React.Dispatch<React.SetStateAction<Configuration>>
  sc: SalesChannel | undefined
}

const DefaultConfigsArea: React.FC<DefaultConfigsProps> = ({
  config,
  setConfig,
  intl,
  sc,
}) => {
  return (
    <Box>
      <Affiliate config={config} intl={intl} setConfig={setConfig} />
      <SearchEndpoint config={config} intl={intl} />
      <Email intl={intl} config={config} setConfig={setConfig} />
      <SalesChannel
        key={config?.salesChannel}
        intl={intl}
        config={config}
        setConfig={setConfig}
        sc={sc}
      />
    </Box>
  )
}

export default DefaultConfigsArea
