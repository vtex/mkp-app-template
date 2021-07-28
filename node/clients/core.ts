import { JanusClient, IOContext, InstanceOptions } from '@vtex/api'
import { CONNECTOR_ENDPOINT, CONNECTOR_NAME, VBASE_BUCKET, VBASE_CONFIG_BASE_PATH, } from '../constants/variables'

export default class CoreClient extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        VtexIdclientAutCookie: context.adminUserAuthToken ?? context.authToken ?? '',
      }
    })
  }

  public getSalesChannelsAsync = () =>
    this.http.get<[SalesChannel]>('api/catalog_system/pvt/saleschannel/list', {
      params: {
        an: this.context.account
      }
    }).then((salesChannels) => {
      return salesChannels.filter(sc => sc.IsActive)
    })

  public registerAffiliate = (config: Configuration, ctx: Context) =>
    ctx.clients.affiliate.registerAffiliate({
      name: CONNECTOR_NAME,
      id: config.affiliateId,
      followUpEmail: config.email,
      salesChannelId: config.salesChannel,
      searchEndpoint: CONNECTOR_ENDPOINT,
    })

  public getConfigFromVBase = (ctx: Context) =>
    ctx.clients.vbase.getJSON<Configuration>(VBASE_BUCKET, `${VBASE_CONFIG_BASE_PATH}/${ctx.vtex.account}`)

  public saveConfigInVBase = async (config: Configuration, ctx: Context) => {
    ctx.clients.vbase.saveJSON(
      VBASE_BUCKET,
      `${VBASE_CONFIG_BASE_PATH}/${ctx.vtex.account}`,
      config
    )
  }
}
