import type { IOContext, InstanceOptions } from '@vtex/api'
import { CONNECTOR_APP_UPDATE_NOTIFICATION_ENDPOINT } from '../constants/variables'
import { ExternalClient } from '@vtex/api'

export default class ConnectorClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(CONNECTOR_APP_UPDATE_NOTIFICATION_ENDPOINT,
      context, options
    )
  }

  public async notifyConnectorAppUpdate(config: Configuration)
  {
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (CONNECTOR_APP_UPDATE_NOTIFICATION_ENDPOINT.match(regex)) {
      config.accountName = this.context.account,
      this.http.post<void>("", config)
    }

  }
}
