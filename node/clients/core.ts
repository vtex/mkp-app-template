import type { IOContext, InstanceOptions } from '@vtex/api'
import { JanusClient } from '@vtex/api'
import type { VBase } from '@vtex/api/lib/clients/infra'

import {
  VBASE_BUCKET,
  VBASE_CONFIG_BASE_PATH,
} from '../constants/variables'

export default class CoreClient extends JanusClient {
  private routes = {
    getSalesChannelList: () => `/api/catalog_system/pvt/saleschannel/list`,
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

  public getSalesChannelsAsync = () =>
    this.http
      .get<[SalesChannel]>(this.routes.getSalesChannelList(), {
        params: {
          an: this.context.account,
        },
      })
      .then((salesChannels) => {
        return salesChannels.filter((sc) => sc.IsActive)
      })

  public getConfigFromVBase = async (vbase: VBase) =>
    vbase
      .getJSON<Configuration>(VBASE_BUCKET, VBASE_CONFIG_BASE_PATH)
      .catch((_) => null)

  public saveConfigInVBase = async (config: Configuration, vbase: VBase) => {
    vbase.saveJSON(VBASE_BUCKET, VBASE_CONFIG_BASE_PATH, config)
  }
}
