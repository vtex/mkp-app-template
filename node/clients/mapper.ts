import type { IOContext, InstanceOptions } from '@vtex/api'
import { JanusClient } from '@vtex/api'
import { CATEGORY_TREE_ENDPOINT, CONNECTOR_NAME, MAPPING_ENDPOINT } from '../constants/variables'


const mappingRegistrationData = {
  "displayName": CONNECTOR_NAME,
  "categoryTreeEndpoint": CATEGORY_TREE_ENDPOINT,
  "mappingEndpoint": MAPPING_ENDPOINT,
  "properties": {
    "allowsRemap": true,
  }
}

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
    const createResponse: any = await this.http.postRaw(
      this.routes.registerMapper(),
      mappingRegistrationData,
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
