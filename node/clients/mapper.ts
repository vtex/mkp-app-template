import type { IOContext, InstanceOptions } from '@vtex/api'
import { JanusClient } from '@vtex/api'
import { CONNECTOR_NAME } from '../constants/variables'



export default class Mapper extends JanusClient {
  private routes = {
    registerMapper: () => '/api/mkp-category-mapper/connector/register',
    deleteMapperConfig: (mapperId: string) => `/api/mkp-category-mapper/connector/configuration/${mapperId}`,
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

  public async deleteMapperConfig(mapperId: string) {
    this.http.delete(this.routes.deleteMapperConfig(mapperId))
  }
}
