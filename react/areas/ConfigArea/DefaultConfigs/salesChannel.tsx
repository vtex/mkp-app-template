import { Anchor, Box, IconStoreSettings } from '@vtex/admin-ui'
import React from 'react'

import InputComponent from '../../../components/InputComponent'
import type { DefaultProps } from '../../../typings/props'
import Country from './country'
import CultureInfo from './cultureInfo'
import Currency from './currency'
import Timezone from './timezone'

export interface SalesChannelProps extends DefaultProps {
  setConfig: React.Dispatch<React.SetStateAction<Configuration>>
  sc: SalesChannel | undefined
}

const SalesChannel: React.FC<SalesChannelProps> = ({ intl, config, sc }) => {
  const salesChannelSelected = sc
  const salesChannelName = salesChannelSelected?.Name ?? ''

  return salesChannelSelected ? (
    <Box
      csx={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '0.25rem',
      }}
    >
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
      <Anchor
        csx={{ marginX: 5, marginY: 4 }}
        href={`/admin/Site/StoreForm.aspx?Id=${salesChannelSelected.Id}`}
        target="_blank"
      >
        <IconStoreSettings />
      </Anchor>
    </Box>
  ) : (
    <Box csx={{ display: 'grid', gap: '0.50rem', marginTop: '0.25rem' }}>
      <Country config={config} intl={intl} />
      <CultureInfo config={config} intl={intl} />
      <Currency config={config} intl={intl} />
      <Timezone config={config} intl={intl} />
    </Box>
  )
}

export default SalesChannel
