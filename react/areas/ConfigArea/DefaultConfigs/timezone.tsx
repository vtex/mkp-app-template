import React from 'react'

import SelectComponent from '../../../components/SelectComponent'
import { useSalesChannelCreationContext } from '../../../contexts/SalesChannelCreationContext'
import type { DefaultProps } from '../../../typings/props'
import { timezonesData } from './RegionData/timezone'

const Timezone: React.FC<DefaultProps> = ({ intl }) => {
  const timezones = Object.keys(timezonesData).map((t) => timezonesData[t])
  const { setSalesChannelData } = useSalesChannelCreationContext()

  return (
    <SelectComponent
      items={timezones}
      initialSelectedItem=""
      label={intl.formatMessage({ id: 'admin/app.timezone.title' })}
      canEdit
      required
      tooltip={intl.formatMessage({ id: 'admin/app.timezone.tooltip' })}
      onChange={(selectState) => {
        if (selectState) {
          setSalesChannelData((oldConfig) => ({
            ...oldConfig,
            TimeZone:
              Object.keys(timezonesData).find(
                (c) => timezonesData[c] === selectState
              ) ?? '',
          }))
        }
      }}
    />
  )
}

export default Timezone
