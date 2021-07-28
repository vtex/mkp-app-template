import { IOClients } from '@vtex/api'
import { Affiliate } from '@vtex/clients'
import CoreClient from './core'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get affiliate() {
    return this.getOrSet('affiliate', Affiliate)
  }

  public get core() {
    return this.getOrSet('core', CoreClient)
  }
}
