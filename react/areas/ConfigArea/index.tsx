import type { FC } from 'react'
import React, { useState } from 'react'
import { Grid, Box, Button, toast, Spinner } from '@vtex/admin-ui'
import { useMutation, useQuery } from 'react-apollo'
import { useIntl } from 'react-intl'

import saveConfig from '../../graphql/saveConfig.gql'
import getConfig from '../../graphql/getConfig.gql'
import getSalesChannels from '../../graphql/getSalesChannels.gql'
import IntegrationStatus from './IntegrationStatus'
import DefaultConfigs from './DefaultConfigs'
import CustomConfigs from './CustomConfigs'

const defaultConfigs: Configuration = {
  active: false,
  affiliateId: '{{affiliateId}}',
  salesChannel: '',
  email: 'email@email.com',
  allowFranchiseAccounts: false
}

const DEFAULT_TOAST_DURATION = 10000

const ConfigArea: FC = () => {
  const intl = useIntl()

  const [config, setConfig] = useState<Configuration>(defaultConfigs)
  const [sc, setSC] = useState<[SalesChannel]>()

  const { data, loading: loadingConfig } = useQuery(getConfig, {
    onCompleted: () => {
      if (!loadingConfig) setConfig({ ...config, ...data.getConfiguration })
    },
  })

  const { data: salesChannels, loading: loadingSC } = useQuery(
    getSalesChannels,
    {
      onCompleted: () => {
        if (!loadingSC) setSC(salesChannels.getSalesChannels)
      },
    }
  )


  const [saveConfiguration, { loading: saveConfigLoading }] = useMutation(
    saveConfig,
    {
      onCompleted: () => {
        toast.dispatch({
          type: 'success',
          dismissible: true,
          duration: DEFAULT_TOAST_DURATION,
          message: intl.formatMessage({ id: 'admin/app.saveConfig.success' }),
        })
      },
      onError: (error) => {
        error.graphQLErrors.forEach((ex, _) => {
          let message = intl.formatMessage({ id: 'admin/app.default.error' })

          switch (ex.message) {
            case 'admin/app.sentoffers.error':
              message = intl.formatMessage({ id: 'admin/app.sentoffers.error' })
              break

            case 'admin/app.error.affiliate.registerFail':
              message = intl.formatMessage({
                id: 'admin/app.error.affiliate.registerFail',
              })
              break

            case 'admin/app.error.salesChannel.invalidFormat':
              message = intl.formatMessage({
                id: 'admin/app.error.salesChannel.invalidFormat',
              })
              break

            case 'admin/app.error.affiliate.invalidFormat':
              message = intl.formatMessage({
                id: 'admin/app.error.affiliate.invalidFormat',
              })
              break

            default:
              message = ''
              break
          }

          toast.dispatch({
            type: 'error',
            dismissible: true,
            duration: DEFAULT_TOAST_DURATION,
            message,
          })
        })
      },
    }
  )

  if(loadingConfig || loadingSC) return (
  <Spinner />
  )

  return (
    <Grid.Item area="config">
      <div>
        <Box csx={{ bg: 'light.primary' }}>
          <IntegrationStatus
            key="integrationStatus"
            config={config}
            setConfig={setConfig}
            intl={intl}
          >
            {{
              on: [
                <DefaultConfigs
                  key="DefaultConfigs"
                  config={config}
                  setConfig={setConfig}
                  intl={intl}
                  sc={sc}
                />,
                <CustomConfigs
                  key="CustomConfigs"
                  config={config}
                  intl={intl}
                  setConfig={setConfig}
                />,
              ],
            }}
          </IntegrationStatus>
        </Box>
        <Box>
          <Grid
            className="grid"
            csx={{ marginY: 2 }}
            templateColumns="25fr 75fr"
          >
            <Button
              variant="primary"
              onClick={() =>
                saveConfiguration({
                  variables: {
                    config,
                  },
                })
              }
            >
              {intl.formatMessage({ id: 'admin/app.save' })}
            </Button>
            {saveConfigLoading && <Spinner csx={{ marginX: 6 }} size={40} />}
          </Grid>
        </Box>
      </div>
    </Grid.Item>
  )
}

export default ConfigArea
