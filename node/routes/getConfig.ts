import httpStatus from 'http-status-codes'
import { APP_VENDOR } from '../constants/variables'

const isHeadersValid = (headers: any) => (headers?.appkey && headers?.apptoken)

export const getConfig = async (ctx: Context) => {
  const { request: { headers }, response, clients: { vtexID } } = ctx
  response.type = "application/json"

  if(!isHeadersValid(headers)){
    response.status = httpStatus.BAD_REQUEST
    response.body = "{ \"error\": \"appKey and appToken are required\" }"
  } else if(!await vtexID.isValidAppKeyAndAppToken(APP_VENDOR, headers.appkey, headers.apptoken)){
    response.status = httpStatus.FORBIDDEN
    response.body = "{ \"error\": \"Invalid appKey and/or appToken\" }"
  } else {
    const config = await ctx.clients.core.getConfigFromVBase(ctx.clients.vbase)
    if(!config){
      response.status = httpStatus.NOT_FOUND
    } else {
      config.accountName = ctx.vtex.account
      config.cookie = ctx.vtex.adminUserAuthToken ?? ctx.vtex.authToken ?? ""
      
      response.body = JSON.stringify(config)
      response.status = httpStatus.OK
    }
  }
}
