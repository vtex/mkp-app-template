import { Box } from '@vtex/admin-ui'
import React from 'react'

import InputComponent from '../../../components/InputComponent'
import type { DefaultProps } from '../../../typings/props'
import Country from './country'
import CultureInfo from './cultureInfo'
import Currency from './currency'
import Timezone from './timezone'

export interface SalesChannelProps extends DefaultProps {
  setConfig: React.Dispatch<React.SetStateAction<Configuration>>
  sc: SalesChannel[] | undefined
}

const SalesChannel: React.FC<SalesChannelProps> = ({
  intl,
  config,
  sc,
}) => {
  const salesChannelSelected = sc?.find((x) => x.Id === config.salesChannel)
  const countryCode = salesChannelSelected?.CountryCode ?? ''
  const salesChannelName = salesChannelSelected?.Name ?? ''

  return (
    salesChannelSelected ?
      (
        <Box csx={{ display: 'flex', alignItems: 'center' }}>
          <Box csx={{ flexGrow: 1 }}>
            <InputComponent
              id="salesChannel"
              initValue={salesChannelName}
              label={intl.formatMessage({ id: 'admin/app.salesChannel.title' })}
              canEdit={false}
              tooltip={intl.formatMessage({ id: 'admin/app.salesChannel.tooltip' })}
              type="text"
            />
          </Box>
          <Box>
            <InputComponent
              id="country"
              label={intl.formatMessage({ id: 'admin/app.country.title' })}
              canEdit={false}
              initValue={countryCode}
              type="text"
              csx={{ width: 75 }}
            />
          </Box>
        </Box>
      ) : (
        <Box csx={{display: 'grid', gap: '0.25rem'}}>
          <Box>
            <Country
              config={config}
              intl={intl}
            />
          </Box>
          <Box>
            <CultureInfo
              config={config}
              intl={intl}
            />
          </Box>
          <Box>
            <Currency
              config={config}
              intl={intl}
            />
          </Box>
          <Box>
            <Timezone
              config={config}
              intl={intl}
            />
          </Box>
        </Box>
      )
  )
}

export default SalesChannel
