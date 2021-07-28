import { Anchor, Box, IconStoreSettings } from "@vtex/admin-ui"
import React from "react"
import InputComponent from "../../../components/InputComponent"
import { DefaultProps } from "../props"

const CONECTOR_ENDPOINT = "{{conectorEndpoint}}"

export interface EmailProps extends DefaultProps {
	config: Configuration
}

const SearchEndpoint: React.FC<DefaultProps> = ({ intl, config }) => {
    return (
        <Box csx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box csx={{ flexGrow: 1 }}>
                <InputComponent
                    id={'searchEndpoint'}
                    name={intl.formatMessage({ id: 'admin/mkp-app-template.notificationEndpoint.title' })}
                    canEdit={false}
                    type={'text'}
                    initValue={CONECTOR_ENDPOINT}
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
