import type { IOContext, InstanceOptions } from '@vtex/api'
import { JanusClient } from '@vtex/api'



export default class Mapper extends JanusClient {
  // private routes = {
  //   activeFeed: () => '/api/sent-offers/feeds',
  //   updateFeedById: (feedId: string) => `/api/sent-offers/feeds/${feedId}`,
  //   getFeedById: (feedId: string) => `/api/sent-offers/feeds/${feedId}`,
  // }

  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        VtexIdclientAutCookie: ctx.adminUserAuthToken ?? ctx.authToken ?? '',
      },
    })
  }

  public async registerMapper() {
    return "categoriasTeste"

  }
}
