import React from 'react'

import SelectComponent from '../../../components/SelectComponent'
import { useSalesChannelCreationContext } from '../../../contexts/SalesChannelCreationContext'
import type { DefaultProps } from '../../../typings/props'
import { cultureInfoData } from './RegionData/cultureInfo'

const CultureInfo: React.FC<DefaultProps> = ({
  intl
}) => {
  const cultures = Object.keys(cultureInfoData).map(c => cultureInfoData[c])
  const { setSalesChannelConfig } = useSalesChannelCreationContext();

  return (
    <SelectComponent
      items={cultures}
      initialSelectedItem={''}
      label={intl.formatMessage({ id: 'admin/app.cultureInfo.title' })}
      canEdit
      tooltip={intl.formatMessage({ id: 'admin/app.cultureInfo.tooltip' })}
      onChange={(selectState) => {
        if (selectState) {
          setSalesChannelConfig((oldConfig) => ({
            ...oldConfig,
            CultureInfo: selectState,
          }))
        }
      }}
    />
  )
}

export default CultureInfo
