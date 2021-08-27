import { UserInputError } from '@vtex/api'
import { FEED_ID } from '../constants/variables'

export const saveConfiguration = async (
  _: unknown,
  { config }: { config: Configuration },
  ctx: Context
) => {
  validateConfig(config)
  
  await ctx.clients.core.saveConfigInVBase(config,ctx)

  const { affiliateId, salesChannel } = config

  var response = await ctx.clients.sentOffers.createFeed({affiliateId, salesChannel, id: FEED_ID})

  if(response)
    await ctx.clients.core.registerAffiliate(config,ctx)
                          .catch((_) => { 
                            throw new UserInputError("admin/mkp-app-template.error.affiliate.registerFail") 
                          })
  else
    throw new UserInputError("error.vtex.sentOffers")                       
}

const validateConfig = async (config: Configuration) => {
  const regexOnlyNumbers = /^[0-9]+$/
  const regexOnlyConsonants = /^[^AEIOU]{3}$/

  if (!regexOnlyNumbers.test(config.salesChannel)) {
    throw new UserInputError('admin/mkp-app-template.error.salesChannel.invalidFormat')
  }

  if (!regexOnlyConsonants.test(config.affiliateId)) {
    throw new UserInputError(
      'admin/mkp-app-template.error.affiliate.invalidFormat'
    )
  }
}
