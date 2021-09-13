import React, { FC, useState } from 'react'
import {
  Grid,
  Box,
  Button,
  toast,
  Spinner
} from '@vtex/admin-ui'
import { useMutation, useQuery } from 'react-apollo'
import { useIntl } from 'react-intl'

import saveConfig from '../../graphql/saveConfig.gql'
import getConfig from '../../graphql/getConfig.gql'
import getSalesChannels from '../../graphql/getSalesChannels.gql'

import IntegrationStatus from './integrationStatus'
import DefaultConfigs from './defaultConfigs'
import CustomConfigs from './customConfigs'

const defaultConfigs: Configuration = {
  active: false,
  affiliateId: '{{affiliateId}}',
  salesChannel: '',
  email: 'email@email.com',
}

const DEFAULT_TOAST_DURATION = 10000

const ConfigArea: FC = () => {
  const intl = useIntl()

  const [config, setConfig] = useState<Configuration>(defaultConfigs)
  const [sc, setSC] = useState<[SalesChannel]>()

  const { data, loading: loadingConfig } = useQuery(getConfig, {
    onCompleted: () => {
      if(!loadingConfig)
        setConfig({ ...config, ...data.getConfiguration })
    }
  })
  const { data: salesChannels, loading: loadingSC } = useQuery(getSalesChannels, {
    onCompleted: () => {
      if(!loadingSC)
        setSC(salesChannels.getSalesChannels)
    }
  })
  const [saveConfiguration, { loading: saveConfigLoading }] = useMutation(saveConfig, {
      onCompleted: () => {
        toast.dispatch({
          type: 'success',
          dismissible: true,
          duration: DEFAULT_TOAST_DURATION,
          message: intl.formatMessage({ id: 'admin/app.saveConfig.success' }),
        })
      },
      onError: (error) => {
        error.graphQLErrors.map((ex, _) => {
          var message = intl.formatMessage({ id: "admin/app.default.error" })
          switch(ex.message){
            case "admin/app.sentoffers.error":
              message = intl.formatMessage({ id: "admin/app.sentoffers.error" })
              break
            case "admin/app.error.affiliate.registerFail":
              message = intl.formatMessage({ id: "admin/app.error.affiliate.registerFail" })
              break
            case "admin/app.error.salesChannel.invalidFormat":
              message = intl.formatMessage({ id: "admin/app.error.salesChannel.invalidFormat" })
              break
            case "admin/app.error.affiliate.invalidFormat":
              message = intl.formatMessage({ id: "admin/app.error.affiliate.invalidFormat" })
              break
          }

          toast.dispatch({
            type: 'error',
            dismissible: true,
            duration: DEFAULT_TOAST_DURATION,
            message: message
          })
        })
      },
    }
  )

  return (
    <Grid.Item area="config">
      <div>
        <Box csx={{ bg: 'light.primary' }}>
          <IntegrationStatus
            config={config}
            setConfig={setConfig}
            intl={intl}
            children={
              { on: [
                  <DefaultConfigs 
                    config={config}
                    setConfig={setConfig}
                    intl={intl}
                    sc={sc}
                  />,
                  <CustomConfigs 
                    config={config}
                    intl={intl}
                    setConfig={setConfig}
                  />
                ]
              }
            }
          />
        </Box>
        <Box>
          <Grid className="grid" csx={{ marginY: 2 }} templateColumns="25fr 75fr">
            <Button
              variant="primary"
              onClick={() =>
                saveConfiguration({
                  variables: {
                    config,
                  },
                })}>
            { intl.formatMessage({ id: "admin/app.save" }) }
            </Button>
            {saveConfigLoading && <Spinner csx={{ marginX: 6 }} size={40} />}
          </Grid>
        </Box>
      </div>
    </Grid.Item>
  )
}

export default ConfigArea
