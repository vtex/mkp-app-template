import { JanusClient } from '@vtex/api'
import type { IOContext, InstanceOptions } from '@vtex/api'

export interface ConnectionEventMessage {
  isActive: boolean
  affiliateId: string
}

export default class ChannelManager extends JanusClient {
  private baseUrl: string

  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        VtexIdclientAutCookie:
          context.adminUserAuthToken ?? context.authToken ?? '',
      },
    })
    this.baseUrl = `/api/channel-manager`
  }

  public upsertMerchantConnection = (
    data: ConnectionEventMessage,
    connectorId: string
  ) =>
    this.http.post(`${this.baseUrl}/connector/${connectorId}/connection`, data)
}
