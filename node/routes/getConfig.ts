import httpStatus from 'http-status-codes'

const validateQuery = (query: any) => (query?.appKey && query?.appToken)

export const getConfig = async (ctx: Context) => {
  const { request: { query }, response, clients: { vtexID } } = ctx

  response.type = "application/json"

  var vendor = "{{appVendor}}"

  if(!validateQuery(query)){
    response.status = httpStatus.BAD_REQUEST
    response.body = "appKey and appToken are required"
  } else if(!await vtexID.validateAppKeyAppToken(vendor, query.appKey, query.appToken)){
    response.status = httpStatus.FORBIDDEN
    response.body = "Invalid AppKey/AppToken"
  } else {
    var config = await ctx.clients.core.getConfigFromVBase(ctx.clients.vbase)
    response.body = JSON.stringify(config)
    response.status = httpStatus.OK
  }
}
