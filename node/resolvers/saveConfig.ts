import { UserInputError } from '@vtex/api'
import { FEED_ID } from '../constants/variables'

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

  const currentStoreConfig = await ctx.clients.core.getConfigFromVBase(ctx.clients.vbase)

  if(currentStoreConfig === null || currentStoreConfig.affiliateId !== affiliateId){
    const res = await ctx.clients.affiliate.isAffiliateAlreadyRegistered(affiliateId)
    if(res){
      throw new UserInputError('admin/app.error.affiliate.alreadyRegistered')  
    }
  }

  await ctx.clients.affiliate.registerAffiliate(config)
    .catch(_ => {
      throw new UserInputError('admin/app.error.affiliate.registerFail')
    })

  await ctx.clients.core.saveConfigInVBase(config, ctx.clients.vbase)
  await ctx.clients.connector.notifyConnectorAppUpdate(config)
  
  await ctx.clients.sentOffers.createFeed({ affiliateId: config.affiliateId, salesChannel: config.salesChannel, id: FEED_ID })
    .catch(_ => {
      throw new UserInputError('admin/app.sentOffers.error')
    })
}
