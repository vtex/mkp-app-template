import React from 'react'

import InputComponent from '../../../components/InputComponent'
import type { DefaultProps } from '../../../typings/props'

export interface AffiliateProps extends DefaultProps {
  setConfig: React.Dispatch<React.SetStateAction<Configuration>>
}

const Affiliate: React.FC<AffiliateProps> = ({ intl, config, setConfig }) => {
  return (
    <InputComponent
      id="affiliateId"
      label={intl.formatMessage({ id: 'admin/app.affiliateId.title' })}
      canEdit={true}
      initValue={config.affiliateId}
      type="text"
      required
      tooltip={intl.formatMessage({ id: 'admin/app.affiliateId.tooltip' })}
      onChange={(value) => {
        if (value !== undefined) {
          setConfig((oldConfig) => ({ ...oldConfig, affiliateId: value }))
        }
      }}
    />
  )
}

export default Affiliate
