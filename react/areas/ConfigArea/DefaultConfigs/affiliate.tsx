import React from 'react'

import InputComponent from '../../../components/InputComponent'
import type { DefaultProps } from '../../../typings/props'

const Affiliate: React.FC<DefaultProps> = ({ intl, config }) => {
  return (
    <InputComponent
      id="affiliateId"
      label={intl.formatMessage({ id: 'admin/app.affiliateId.title' })}
      canEdit={false}
      initValue={config.affiliateId}
      type="text"
    />
  )
}

export default Affiliate
