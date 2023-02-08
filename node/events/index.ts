import type { EventContext } from '@vtex/api'

import type { Clients } from '../clients'

export type IOEventContext = EventContext<Clients>

export interface ConnectionStatusInformation {
  isActive: boolean
  connectorId: string
  affiliateId: string
  merchantAccount: string
}

interface UpdateConnectionStatus extends IOEventContext {
  body: ConnectionStatusInformation
}

export const updateConnectionStatus = (ctx: UpdateConnectionStatus) => {
  return ctx.body.affiliateId
}
