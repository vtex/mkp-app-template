import type { FC } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import { Grid, Box, Button, toast, Spinner } from '@vtex/admin-ui'
import { useMutation, useQuery } from 'react-apollo'
import { useIntl } from 'react-intl'

import saveConfig from '../../graphql/saveConfig.gql'
import createSalesChannel from '../../graphql/createSalesChannel.gql'
import getConfig from '../../graphql/getConfig.gql'
import getSalesChannel from '../../graphql/getSalesChannel.gql'
import IntegrationStatus from './IntegrationStatus'
import DefaultConfigs from './DefaultConfigs'
import CustomConfigs from './CustomConfigs'
import { SalesChannelCreationContextProvider } from '../../contexts/SalesChannelCreationContext'

const defaultConfigs: Configuration = {
  active: false,
  affiliateId: '',
  salesChannel: '',
  email: 'email@email.com',
  allowFranchiseAccounts: false,
}

const defaultSalesChannel: SalesChannel = {
  Id: '',
  Name: '',
  CountryCode: '',
  CurrencyCode: '',
  TimeZone: '',
  CultureInfo: '',
}

const DEFAULT_TOAST_DURATION = 10000

const ConfigArea: FC = () => {
  const intl = useIntl()

  const [config, setConfig] = useState<Configuration>(defaultConfigs)
  const [sc, setSC] = useState<SalesChannel>()
  const [salesChannelData, setSalesChannelData] =
    useState<SalesChannel>(defaultSalesChannel)

  const salesChannelCreated = useRef(false)

  const { data, loading: loadingConfig } = useQuery(getConfig, {
    onCompleted: () => {
      if (!loadingConfig) setConfig({ ...config, ...data.getConfiguration })
    },
  })

  const { data: salesChannel, loading: loadingSC } = useQuery(getSalesChannel, {
    variables: { salesChannelId: config?.salesChannel },
    onCompleted: () => {
      if (!loadingSC) setSC(salesChannel.getSalesChannel)
    },
  })

  const [createNewSalesChannel, { loading: createSCLoading }] = useMutation(
    createSalesChannel,
    {
      onCompleted: (scData) => {
        setConfig((oldConfig) => ({
          ...oldConfig,
          salesChannel: scData.createSalesChannel,
        }))
        salesChannelCreated.current = true
      },
      onError: (error) => {
        error.graphQLErrors.forEach((ex, _) => {
          let message = ''

          switch (ex.message) {
            case 'admin/app.error.salesChannel.creation':
              message = intl.formatMessage({
                id: 'admin/app.error.salesChannel.creation',
              })
              break

            case 'admin/app.error.salesChannel.missingRequiredFields':
              message = intl.formatMessage({
                id: 'admin/app.error.salesChannel.missingRequiredFields',
              })
              break

            default:
              message = intl.formatMessage({ id: 'admin/app.default.error' })
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
      refetchQueries: [{ query: getSalesChannel }],
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
          let message = ''

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

            case 'admin/app.error.affiliate.alreadyRegistered':
              message = intl.formatMessage({
                id: 'admin/app.error.affiliate.alreadyRegistered',
              })
              break

            default:
              message = intl.formatMessage({ id: 'admin/app.default.error' })
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

  useEffect(() => {
    if (salesChannelCreated.current) {
      salesChannelCreated.current = false
      saveConfiguration({
        variables: {
          config,
        },
      })
    }
  }, [config, setConfig])

  if (loadingConfig || loadingSC) return <Spinner />

  return (
    <Grid.Item area="config">
      <SalesChannelCreationContextProvider
        salesChannelData={salesChannelData}
        setSalesChannelData={setSalesChannelData}
      >
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
                onClick={() => {
                  if (config.salesChannel) {
                    saveConfiguration({
                      variables: {
                        config,
                      },
                    })
                  } else {
                    createNewSalesChannel({
                      variables: {
                        salesChannelData,
                      },
                    })
                  }
                }}
              >
                {intl.formatMessage({ id: 'admin/app.save' })}
              </Button>
              {(createSCLoading || saveConfigLoading) && (
                <Spinner csx={{ marginX: 6 }} size={40} />
              )}
            </Grid>
          </Box>
        </div>
      </SalesChannelCreationContextProvider>
    </Grid.Item>
  )
}

export default ConfigArea
