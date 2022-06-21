import { UserInputError } from '@vtex/api'
import { APP_VENDOR, CONNECTOR_NAME } from '../constants/variables'

export const createSalesChannel = async (
  _: unknown,
  { salesChannelData }: { salesChannelData: SalesChannel },
  ctx: Context
) => {
  salesChannelData.Name = `(${APP_VENDOR}) ${CONNECTOR_NAME}`
  return await ctx.clients.catalog.createSalesChannel(salesChannelData)
    .catch(_ => {
      throw new UserInputError('admin/app.error.salesChannel.creation')
    }).then((salesChannelId) => {
      return salesChannelId.toString()
    })
}
