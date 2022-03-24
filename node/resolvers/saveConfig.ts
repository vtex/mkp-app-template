import { UserInputError } from '@vtex/api'

import { FEED_ID } from '../constants/variables'
import { getMapperId } from './getMapperId'

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

  //delete mapper config when integration is deactivated
  if (config.active == false) {
    const storedId = await ctx.clients.core.getMapperIdFromVBase(ctx.clients.vbase)
    if (storedId != null) {
      await ctx.clients.core.removeMapperIdFromVBase(ctx.clients.vbase)
      await ctx.clients.mapper.deleteMapperConfig(storedId)
    }
  }
  const mapperId = (config.active === false ? null : await getMapperId(_, null, ctx))
  await ctx.clients.core.saveConfigInVBase({...config,mapperId: mapperId}, ctx.clients.vbase)
  await ctx.clients.connector.notifyConnectorAppUpdate(config)

  const { affiliateId, salesChannel } = config

  await ctx.clients.sentOffers
    .createFeed({ affiliateId, salesChannel, id: FEED_ID })
    .then(async () => {
      await ctx.clients.core.registerAffiliate(config, ctx).catch((__) => {
        throw new UserInputError('admin/app.error.affiliate.registerFail')
      })
    })
    .catch((___) => {
      throw new UserInputError('admin/app.sentoffers.error')
    })
}
