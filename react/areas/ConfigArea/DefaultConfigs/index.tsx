import React from 'react'

import Affiliate from './affiliate'
import SearchEndpoint from './endpoint'
import SalesChannel from './salesChannel'
import Email from './email'
import type { DefaultProps } from '../../../typings/props'

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
    <div>
      <Affiliate config={config} intl={intl} />
      <SearchEndpoint config={config} intl={intl} />
      <SalesChannel intl={intl} config={config} setConfig={setConfig} sc={sc} />
      <Email intl={intl} config={config} setConfig={setConfig} />
    </div>
  )
}

export default DefaultConfigsArea
