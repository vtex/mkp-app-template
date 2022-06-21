import type { IOContext, InstanceOptions } from '@vtex/api'
import { JanusClient } from '@vtex/api'
import type { VBase } from '@vtex/api/lib/clients/infra'

import {
  VBASE_BUCKET,
  VBASE_CONFIG_BASE_PATH,
} from '../constants/variables'

export default class ConfigurationClient extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        VtexIdclientAutCookie:
          context.adminUserAuthToken ?? context.authToken ?? '',
      },
    })
  }

  public getConfigFromVBase = async (vbase: VBase) =>
    vbase
      .getJSON<Configuration>(VBASE_BUCKET, VBASE_CONFIG_BASE_PATH)
      .catch((_) => null)

  public saveConfigInVBase = async (config: Configuration, vbase: VBase) => {
    vbase.saveJSON(VBASE_BUCKET, VBASE_CONFIG_BASE_PATH, config)
  }
}
