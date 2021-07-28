import {
  UserInputError,
} from '@vtex/api'

export const saveConfiguration = async (
  _: unknown,
  { config }: { config: Configuration },
  ctx: Context
) => {
  validateConfig(config)
  
  return ctx.clients.core.registerAffiliate(config, ctx)
    .then(() => { ctx.clients.core.saveConfigInVBase(config, ctx) })
    .catch((_) => { throw new UserInputError("admin/mkp-app-template.error.affiliate.registerFail") })
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
