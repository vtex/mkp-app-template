import type { IOContext, InstanceOptions } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class NotificatorClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super("", context, {
      ...options,
      headers: {
        VtexIdclientAutCookie:
          context.adminUserAuthToken ?? context.authToken ?? '',
      },
    })
  }
  // Validar no OrderIntegration (subir um beta para conseguir fazer a chamada)
  public notifyOrderStatusChange = (orderStatusChange: OrderStatusChange) =>
    this.http
      .post('{{orderStatusChangeNotificationEndpoint}}', orderStatusChange, {
        params: {
          an: this.context.account,
        },
      })
}
