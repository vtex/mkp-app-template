import { IOClients } from '@vtex/api'

import AffiliateClient from './affiliate'
import CatalogClient from './catalog'
import ConnectorClient from './connector'
import ConfigurationClient from './configuration'
import SentOffers from './sentOffers'
import VtexIDClient from './vtexId'
import ChannelManager from './channelManager'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get affiliate() {
    return this.getOrSet('affiliate', AffiliateClient)
  }

  public get vtexID() {
    return this.getOrSet('vtexID', VtexIDClient)
  }

  public get configuration() {
    return this.getOrSet('configuration', ConfigurationClient)
  }

  public get sentOffers() {
    return this.getOrSet('sentOffers', SentOffers)
  }

  public get connector() {
    return this.getOrSet('connector', ConnectorClient)
  }

  public get catalog() {
    return this.getOrSet('catalog', CatalogClient)
  }

  public get channelManager() {
    return this.getOrSet('channelManager', ChannelManager)
  }
}
