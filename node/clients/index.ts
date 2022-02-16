import { IOClients } from '@vtex/api'
import { Affiliate } from '@vtex/clients'
import ConnectorClient from './connector'

import CoreClient from './core'
import SentOffers from './sentOffers'
import VtexIDClient from './vtexId'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get affiliate() {
    return this.getOrSet('affiliate', Affiliate)
  }

  public get vtexID() {
    return this.getOrSet('vtexID', VtexIDClient)
  }

  public get core() {
    return this.getOrSet('core', CoreClient)
  }

  public get sentOffers() {
    return this.getOrSet('sentOffers', SentOffers)
  }

  public get connector() {
    return this.getOrSet('connector', ConnectorClient)
  }
}
