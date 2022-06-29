import httpStatus from 'http-status-codes'

import { APP_VENDOR, VTEX_APP_KEY_HEADER, VTEX_APP_TOKEN_HEADER } from '../constants/variables'

const headersExist = (headers: any) => (headers?.appkey && headers?.apptoken) || (headers[VTEX_APP_KEY_HEADER] && headers[VTEX_APP_TOKEN_HEADER])

export const getConfig = async (ctx: Context) => {
  const {
    request: { headers },
    response,
    clients: { vtexID },
  } = ctx

  response.type = 'application/json'

  if (!headersExist(headers)) {
    response.status = httpStatus.BAD_REQUEST
    response.body = JSON.stringify({
      message: 'AppKey and AppToken are required',
    })
  } else if (
    !(await vtexID.areValidAppKeyAndAppToken(
      APP_VENDOR,
      headers.appkey ?? headers[VTEX_APP_KEY_HEADER],
      headers.apptoken ?? headers[VTEX_APP_TOKEN_HEADER]
    ))
  ) {
    response.status = httpStatus.FORBIDDEN
    response.body = JSON.stringify({
      message: 'Invalid appKey and/or appToken',
    })
  } else {
    const config = await ctx.clients.core.getConfigFromVBase(ctx.clients.vbase)

    if (!config) {
      response.status = httpStatus.NOT_FOUND
    } else {
      config.accountName = ctx.vtex.account
      config.cookie = ctx.vtex.authToken ?? ''

      response.body = JSON.stringify(config)
      response.status = httpStatus.OK
    }
  }
}
