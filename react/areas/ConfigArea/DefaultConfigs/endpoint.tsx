import { Anchor, Box, IconStoreSettings } from "@vtex/admin-ui"
import React from "react"
import InputComponent from "../../../components/InputComponent"
import { DefaultProps } from "../../../typings/props"

const CONNECTOR_ENDPOINT = "{{connectorEndpoint}}"

const SearchEndpoint: React.FC<DefaultProps> = ({ intl, config }) => {
    return (
        <Box csx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box csx={{ flexGrow: 1 }}>
                <InputComponent
                    id={'searchEndpoint'}
                    label={intl.formatMessage({ id: 'admin/app.notificationEndpoint.title' })}
                    canEdit={false}
                    type={'text'}
                    initValue={CONNECTOR_ENDPOINT}
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
