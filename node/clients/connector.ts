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
    config.accountName = this.context.account,
    this.http.post<void>("", config)
    return ""
  }
}
