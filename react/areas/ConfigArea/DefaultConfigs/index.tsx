import React from 'react'

import Affiliate from './affiliate'
import SearchEndpoint from './endpoint'
import SalesChannel from './salesChannel'
import Email from './email'
import type { DefaultProps } from '../../../typings/props'
import { Box } from '@vtex/admin-ui'

export interface DefaultConfigsProps extends DefaultProps {
  setConfig: React.Dispatch<React.SetStateAction<Configuration>>
  sc: SalesChannel[] | undefined
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
      <SalesChannel key={config?.salesChannel} intl={intl} config={config} setConfig={setConfig} sc={sc} />
      <Email intl={intl} config={config} setConfig={setConfig} />
    </Box>
  )
}

export default DefaultConfigsArea
