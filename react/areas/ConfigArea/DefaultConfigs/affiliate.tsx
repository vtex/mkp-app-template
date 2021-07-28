import React from "react"
import InputComponent from "../../../components/InputComponent"
import { DefaultProps } from "../props"

const Affiliate: React.FC<DefaultProps> = ({ intl, config }) => {
    return (
        <InputComponent
            id={'affiliateId'}
            name={intl.formatMessage({ id: 'admin/mkp-app-template.affiliateId.title' })}
            canEdit={false}
            initValue={config.affiliateId}
            type={'text'}
        />
    )
}

export default Affiliate
