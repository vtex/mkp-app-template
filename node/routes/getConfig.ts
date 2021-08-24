import httpStatus from 'http-status-codes'

const isHeadersValid = (headers: any) => (headers?.appkey && headers?.apptoken)

export const getConfig = async (ctx: Context) => {
  const { request: { headers }, response, clients: { vtexID } } = ctx
  response.type = "application/json"

  const vendor = "{{appVendor}}"

  if(!isHeadersValid(headers)){
    response.status = httpStatus.BAD_REQUEST
    response.body = "appKey and appToken are required"
  } else if(!await vtexID.isValidAppKeyAndAppToken(vendor, headers.appkey, headers.apptoken)){
    response.status = httpStatus.FORBIDDEN
    response.body = "Invalid AppKey/AppToken"
  } else {
    const config = await ctx.clients.core.getConfigFromVBase(ctx.clients.vbase)
    response.body = JSON.stringify(config)
    response.status = httpStatus.OK
  }
}
