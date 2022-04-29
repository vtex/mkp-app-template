import { UserInputError } from '@vtex/api'

import { FEED_ID } from '../constants/variables'

const validateConfig = async (config: Configuration) => {
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

  const { affiliateId, salesChannel } = config

  const currentStoreConfig = ctx.client.core.getConfigFromVBase(ctx.clients.vbase)
  if(currentStoreConfig != null){
    if(currentStoreConfig.affiliateId != affiliateId) {
      if(ctx.clients.core.isAffiliateAlreadyRegisted(affiliateId)) {
        throw new UserInputError('admin/app.error.affiliate.alreadyRegistered')
      }
    }
  }

  await ctx.clients.core.registerAffiliate(config, ctx)
    .catch((_) => {
      throw new UserInputError('admin/app.error.affiliate.registerFail')
    })

  await ctx.clients.core.saveConfigInVBase(config, ctx.clients.vbase)
  await ctx.clients.connector.notifyConnectorAppUpdate(config)

  await ctx.clients.sentOffers.createFeed({ affiliateId, salesChannel, id: FEED_ID })
    .catch((_) => {
      throw new UserInputError('admin/app.sentoffers.error')
    })
}
