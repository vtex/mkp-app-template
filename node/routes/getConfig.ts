import httpStatus from 'http-status-codes'

export const getConfig = async (ctx: Context) => {
  const { response } = ctx

  var config = await ctx.clients.core.getConfigFromVBase(ctx);

  response.body = JSON.stringify(config)
  response.status = httpStatus.OK
}