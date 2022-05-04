import httpStatus from 'http-status-codes'

import {
  APP_VENDOR,
  CONNECTOR_ENDPOINT,
} from '../constants/variables'

const headersExist = (headers: any) => headers?.appkey && headers?.apptoken

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
      message: 'AppKey and AppToken are required',
    })
  } else if (
    !(await vtexID.areValidAppKeyAndAppToken(
      APP_VENDOR,
      headers.appkey,
      headers.apptoken
    ))
  ) {
    response.status = httpStatus.FORBIDDEN
    response.body = JSON.stringify({
      message: 'Invalid appKey and/or appToken',
    })
  } else {
    const config: ConnectorConfiguration = {
      connectorEndpoint:
        CONNECTOR_ENDPOINT,
    }

    if (!config) {
      response.status = httpStatus.NOT_FOUND
    } else {
      response.body = JSON.stringify(config)
      response.status = httpStatus.OK
    }
  }
}
