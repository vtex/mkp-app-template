import type { IOContext, InstanceOptions } from '@vtex/api'
import { JanusClient } from '@vtex/api'
import { NOT_FOUND } from '../constants/statusCode';

import {
  CONNECTOR_ENDPOINT,
  CONNECTOR_NAME,
} from '../constants/variables'

import { buildNotificationEndpoint } from '../utils';

const AFILLIATE_CATALOG_NOTIFICATION_PATH = "/catalog/notification";

export default class AffiliateClient extends JanusClient {
  private routes = {
    getAffiliateById: (affiliateId: string) => `/api/fulfillment/pvt/affiliates/${affiliateId}`,
    registerAffiliate: (affiliateId: string) => `/api/fulfillment/pvt/affiliates/${affiliateId}`
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

  public isAffiliateAlreadyRegistered = (affiliateId: string) =>
    this.http
      .getRaw(this.routes.getAffiliateById(affiliateId), {
        params: {
          an: this.context.account
        }
      }).then(getAffiliateResponse => {
        return getAffiliateResponse.status.toString().startsWith("2")
      }).catch(err => {
        return !(err?.response?.status === NOT_FOUND)
      })

  public registerAffiliate = async (config: Configuration) =>
    this.http
      .put(this.routes.registerAffiliate(config.affiliateId),
        {
          id: config.affiliateId,
          name: `${CONNECTOR_NAME}-${config.affiliateId}`,
          followUpEmail: config.email,
          salesChannel: config.salesChannel,
          searchURIEndpoint: buildNotificationEndpoint(CONNECTOR_ENDPOINT, AFILLIATE_CATALOG_NOTIFICATION_PATH),
          SearchURIEndpointVersion: "1.x.x",
          SearchURIEndpointAvailableVersions: ["1.x.x"]
        },
        {
          params: {
            an: this.context.account
          }
        })
}
