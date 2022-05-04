import { Anchor, Box, IconStoreSettings } from '@vtex/admin-ui'
import React from 'react'

import InputComponent from '../../../components/InputComponent'
import type { DefaultProps } from '../../../typings/props'

const CONNECTOR_ENDPOINT = '{{connectorEndpoint}}'
const AFILLIATE_CATALOG_NOTIFICATION_PATH = "/catalog/notification";

const SearchEndpoint: React.FC<DefaultProps> = ({ intl, config }) => {
  return (
    <Box csx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Box csx={{ flexGrow: 1 }}>
        <InputComponent
          id="searchEndpoint"
          label={intl.formatMessage({
            id: 'admin/app.notificationEndpoint.title',
          })}
          canEdit={false}
          type="text"
          initValue={CONNECTOR_ENDPOINT.replace(/\/+$/, '').concat(AFILLIATE_CATALOG_NOTIFICATION_PATH)}
        />
      </Box>
      <Anchor
        csx={{ marginX: 5, marginY: 4 }}
        href={`/admin/checkout/#/affiliates/${config.affiliateId}`}
        target="_blank"
      >
        <IconStoreSettings />
      </Anchor>
    </Box>
  )
}

export default SearchEndpoint
