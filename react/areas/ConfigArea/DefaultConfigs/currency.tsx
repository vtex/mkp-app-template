import React from 'react'

import SelectComponent from '../../../components/SelectComponent'
import { useSalesChannelCreationContext } from '../../../contexts/SalesChannelCreationContext'
import type { DefaultProps } from '../../../typings/props'
import { currencyCodesData } from './RegionData/currency'

const Currency: React.FC<DefaultProps> = ({ intl }) => {
  // eslint-disable-next-line @typescript-eslint/require-array-sort-compare
  const currencies = Object.keys(currencyCodesData)
    .map((c) => currencyCodesData[c])
    .sort()

  const { setSalesChannelData } = useSalesChannelCreationContext()

  return (
    <SelectComponent
      items={currencies}
      initialSelectedItem=""
      label={intl.formatMessage({ id: 'admin/app.currency.title' })}
      canEdit
      required
      tooltip={intl.formatMessage({ id: 'admin/app.currency.tooltip' })}
      onChange={(selectState) => {
        if (selectState) {
          setSalesChannelData((oldConfig) => ({
            ...oldConfig,
            CurrencyCode:
              Object.keys(currencyCodesData).find(
                (c) => currencyCodesData[c] === selectState
              ) ?? '',
          }))
        }
      }}
    />
  )
}

export default Currency
