import { UserInputError } from '@vtex/api'

import {
  CONNECTOR_ID,
  EMPTY_STRING,
  FEED_ID,
  UPDATE_CHANNEL_MANAGER_CONNECTION_STATUS_KEY,
} from '../constants/variables'
import type { ConnectionStatusInformation } from '../events'

const validateConfig = (config: Configuration) => {
  const regexOnlyNumbers = /^[0-9]+$/
  const regexOnlyConsonants = /^[^AEIOU]{3}$/

  if (!regexOnlyNumbers.test(config.salesChannel)) {
    throw new UserInputError('admin/app.error.salesChannel.invalidFormat')
  }

  if (!regexOnlyConsonants.test(config.affiliateId)) {
    throw new UserInputError('admin/app.error.affiliate.invalidFormat')
  }
}

export const saveConfiguration = async (
  _: unknown,
  { config }: { config: Configuration },
  ctx: Context
) => {
  validateConfig(config)

  const { affiliateId } = config
  const currentStoreConfig = await ctx.clients.configuration.getConfigFromVBase(
    ctx.clients.vbase
  )

  if (
    currentStoreConfig === null ||
    currentStoreConfig.affiliateId !== affiliateId
  ) {
    const res = await ctx.clients.affiliate.isAffiliateAlreadyRegistered(
      affiliateId
    )

    if (res) {
      throw new UserInputError('admin/app.error.affiliate.alreadyRegistered')
    }
  }

  await ctx.clients.affiliate.registerAffiliate(config).catch((__) => {
    throw new UserInputError('admin/app.error.affiliate.registerFail')
  })
  const eventBody: ConnectionStatusInformation = {
    isActive: config.active,
    connectorId: CONNECTOR_ID,
    affiliateId: config.affiliateId,
    merchantAccount: ctx.vtex.account,
  }

  ctx.clients.events.sendEvent(
    EMPTY_STRING,
    `${UPDATE_CHANNEL_MANAGER_CONNECTION_STATUS_KEY}`,
    eventBody
  )

  await ctx.clients.configuration.saveConfigInVBase(config, ctx.clients.vbase)
  await ctx.clients.connector.notifyConnectorAppUpdate(config)

  await ctx.clients.sentOffers
    .createFeed({
      affiliateId: config.affiliateId,
      salesChannel: config.salesChannel,
      id: FEED_ID,
    })
    .catch((___) => {
      throw new UserInputError('admin/app.sentOffers.error')
    })
}
