import React from 'react'

import SelectComponent from '../../../components/SelectComponent'
import { useSalesChannelCreationContext } from '../../../contexts/SalesChannelCreationContext'
import type { DefaultProps } from '../../../typings/props'
import { countryCodesData } from './RegionData/countryCode'

const Country: React.FC<DefaultProps> = ({
  intl
}) => {
  const countries = Object.keys(countryCodesData).map(c => countryCodesData[c])
  const { setSalesChannelData } = useSalesChannelCreationContext();

  return (
    <SelectComponent
      items={countries}
      initialSelectedItem={''}
      label={intl.formatMessage({ id: 'admin/app.country.title' })}
      canEdit
      tooltip={intl.formatMessage({ id: 'admin/app.country.tooltip' })}
      onChange={(selectState) => {
        if (selectState) {
          setSalesChannelData((oldConfig) => ({
            ...oldConfig,
            CountryCode: Object.keys(countryCodesData).find(c => countryCodesData[c] == selectState) ?? ''
          }))
        }
      }}
    />
  )
}

export default Country
