import type { IOContext, InstanceOptions } from '@vtex/api'
import { JanusClient } from '@vtex/api'

export default class CatalogClient extends JanusClient {
  private routes = {
    createNewSalesChannel: () => '/api/catalog_system/pvt/saleschannel'
  }

  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        VtexIdclientAutCookie:
          context.adminUserAuthToken ?? context.authToken ?? '',
      },
    })
  }

  public createSalesChannel = (salesChannel: SalesChannel) =>
    this.http
      .post<number>(this.routes.createNewSalesChannel(),
        salesChannel,
        {
          params: {
            an: this.context.account
          }
        })
}
