import type { IOContext, InstanceOptions } from '@vtex/api'
import { JanusClient } from '@vtex/api'
import { CONNECTOR_NAME } from '../constants/variables'



export default class Mapper extends JanusClient {
  private routes = {
    registerMapper: () => '/api/mkp-category-mapper/connector/register',
  }

  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        VtexIdclientAutCookie: ctx.adminUserAuthToken ?? ctx.authToken ?? '',
      },
    })
  }

  public async registerMapper() {
    console.log("registering mapper")
    const data = {
      "displayName": CONNECTOR_NAME,
      "categoryTreeEndpoint": "http://api.vtexinternal.com.br/",
      "mappingEndpoint": "http://api.vtexinternal.com.br/",
      "properties": {
        "allowsRemap": true,
      }
    }
    const createResponse: any = await this.http.postRaw(
      this.routes.registerMapper(),
      data,
      {
        params: {
          an: this.context.account,
        },
        validateStatus: (status: number) => true || status,
      }
      )
      return createResponse
  }
}
