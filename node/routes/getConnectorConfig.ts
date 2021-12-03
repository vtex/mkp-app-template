import httpStatus from 'http-status-codes'

import {
  APP_VENDOR,
  CONNECTOR_ORDER_PROCESSING_NOTIFICATION_ENDPOINT,
} from '../constants/variables'

const HEADER_VTEX_APP_KEY = "x-vtex-api-appkey"
const HEADER_VTEX_APP_TOKEN = "x-vtex-api-apptoken"

const headersExist = (headers: any) => headers?.[HEADER_VTEX_APP_KEY] && headers?.[HEADER_VTEX_APP_TOKEN]

export const getConnectorConfig = async (ctx: Context) => {
  const {
    request: { headers },
    response,
    clients: { vtexID },
  } = ctx

  response.type = 'application/json'

  if (!headersExist(headers)) {
    response.status = httpStatus.BAD_REQUEST
    response.body = JSON.stringify({
      message: HEADER_VTEX_APP_KEY + ' and ' + HEADER_VTEX_APP_TOKEN + ' are required',
    })
  } else if (
    !(await vtexID.areValidAppKeyAndAppToken(
      APP_VENDOR,
      headers?.[HEADER_VTEX_APP_KEY],
      headers?.[HEADER_VTEX_APP_TOKEN]
    ))
  ) {
    response.status = httpStatus.FORBIDDEN
    response.body = JSON.stringify({
      message: 'Invalid ' + HEADER_VTEX_APP_KEY + ' and/or ' + HEADER_VTEX_APP_TOKEN,
    })
  } else {
    const config: ConnectorConfiguration = {
      orderProcessingNotificationEndpoint:
        CONNECTOR_ORDER_PROCESSING_NOTIFICATION_ENDPOINT,
    }

    if (!config) {
      response.status = httpStatus.NOT_FOUND
    } else {
      response.body = JSON.stringify(config)
      response.status = httpStatus.OK
    }
  }
}
