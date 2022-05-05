import type { IOContext, InstanceOptions } from '@vtex/api'
import { CONNECTOR_ENDPOINT } from '../constants/variables'
import { ExternalClient } from '@vtex/api'

import { getEndpointWithoutQueryString, getQueryStringFromEndpoint } from '../utils'

export default class ConnectorClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(getEndpointWithoutQueryString(CONNECTOR_ENDPOINT),
      context, options
    )
  }

  public async notifyConnectorAppUpdate(config: Configuration) {
    var expression = /^([^:\/\s]+:\/?\/?([^\/\s@]*@)?([^\/@:]*)?:?(\d+)?)?(\/[^?]*)?(\?[^#]*)?$/gi
    var regex = new RegExp(expression)

    config.cookie = this.context.authToken ?? ''

    if (CONNECTOR_ENDPOINT.match(regex)) {
      config.accountName = this.context.account
      this.http.post(`store-config/notification${getQueryStringFromEndpoint(CONNECTOR_ENDPOINT)}`, config)
    }
  }
}
