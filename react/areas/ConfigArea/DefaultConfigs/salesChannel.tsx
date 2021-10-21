import { Box } from '@vtex/admin-ui'
import React from 'react'

import InputComponent from '../../../components/InputComponent'
import SelectComponent from '../../../components/SelectComponent'
import type { DefaultProps } from '../../../typings/props'

export interface SalesChannelProps extends DefaultProps {
  setConfig: React.Dispatch<React.SetStateAction<Configuration>>
  sc: SalesChannel[] | undefined
}

const SalesChannel: React.FC<SalesChannelProps> = ({
  intl,
  config,
  setConfig,
  sc,
}) => {
  const salesChannelSelected = sc?.find((x) => x.Id === config.salesChannel)
  const cultureInfo = salesChannelSelected?.CountryCode ?? ''
  const salesChannelName = salesChannelSelected?.Name ?? ''

  return (
    <Box csx={{ display: 'flex', alignItems: 'center' }}>
      <Box csx={{ flexGrow: 1 }}>
        <SelectComponent
          items={
            sc?.map((curSc) => {
              return curSc.Name
            }) ?? []
          }
          initialSelectedItem={salesChannelName}
          label={intl.formatMessage({ id: 'admin/app.salesChannel.title' })}
          canEdit
          tooltip={intl.formatMessage({ id: 'admin/app.salesChannel.tooltip' })}
          onChange={(selectState) => {
            if (selectState) {
              setConfig((oldConfig) => ({
                ...oldConfig,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                salesChannel: sc?.find((x) => x.Name === selectState)?.Id ?? '',
              }))
            }
          }}
        />
      </Box>
      <Box>
        <InputComponent
          id="cultureInfo"
          label={intl.formatMessage({ id: 'admin/app.cultureInfo.title' })}
          canEdit={false}
          initValue={cultureInfo}
          type="text"
          csx={{ width: 75 }}
        />
      </Box>
    </Box>
  )
}

export default SalesChannel
