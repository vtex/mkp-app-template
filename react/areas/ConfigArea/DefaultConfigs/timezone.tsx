import React from 'react'

import SelectComponent from '../../../components/SelectComponent'
import { useSalesChannelCreationContext } from '../../../contexts/SalesChannelCreationContext'
import type { DefaultProps } from '../../../typings/props'
import { timezonesData } from './RegionData/timezone'

const Timezone: React.FC<DefaultProps> = ({
  intl
}) => {
  const timezones = Object.keys(timezonesData).map(t => timezonesData[t])
  const { setSalesChannelConfig } = useSalesChannelCreationContext();

  return (
    <SelectComponent
      items={timezones}
      initialSelectedItem={''}
      label={intl.formatMessage({ id: 'admin/app.timezone.title' })}
      canEdit
      tooltip={intl.formatMessage({ id: 'admin/app.timezone.tooltip' })}
      onChange={(selectState) => {
        if (selectState) {
          setSalesChannelConfig((oldConfig) => ({
            ...oldConfig,
            TimeZone: selectState,
          }))
        }
      }}
    />
  )
}

export default Timezone
