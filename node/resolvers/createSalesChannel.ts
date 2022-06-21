import { UserInputError } from '@vtex/api'

import { APP_VENDOR, CONNECTOR_NAME } from '../constants/variables'

export const createSalesChannel = async (
  _: unknown,
  { salesChannelData }: { salesChannelData: SalesChannel },
  ctx: Context
) => {
  if (
    !salesChannelData.CountryCode ||
    !salesChannelData.CultureInfo ||
    !salesChannelData.CurrencyCode ||
    !salesChannelData.TimeZone
  ) {
    throw new UserInputError(
      'admin/app.error.salesChannel.missingRequiredFields'
    )
  }

  salesChannelData.Name = `(${APP_VENDOR}) ${CONNECTOR_NAME}`

  return ctx.clients.catalog
    .createSalesChannel(salesChannelData)
    .catch((__) => {
      throw new UserInputError('admin/app.error.salesChannel.creation')
    })
    .then((salesChannelId) => {
      return salesChannelId.toString()
    })
}
