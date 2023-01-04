import type { IOContext, InstanceOptions } from '@vtex/api'
import { JanusClient } from '@vtex/api'

export default class CatalogClient extends JanusClient {
  private routes = {
    createNewSalesChannel: () => '/api/catalog_system/pvt/saleschannel',
    getSalesChannelById: (id: string) => `/api/catalog_system/pvt/saleschannel/${id}`
  }

  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        VtexIdclientAutCookie:
          context.adminUserAuthToken ?? context.authToken ?? '',
          'x-vtex-user-agent': 'mkp-app-template'
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

  public getSalesChannel = (salesChannelId: string) =>
    this.http
      .get<SalesChannel>(this.routes.getSalesChannelById(salesChannelId),
        {
          params: {
            an: this.context.account
          }
        })
}
