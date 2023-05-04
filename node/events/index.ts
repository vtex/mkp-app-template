import type { EventContext } from '@vtex/api'

import type { Clients } from '../clients'
import type { ConnectionEventMessage } from '../clients/channelManager'

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

export function updateConnectionStatus(ctx: UpdateConnectionStatus) {
  const data: ConnectionEventMessage = {
    affiliateId: ctx.body.affiliateId,
    isActive: ctx.body.isActive,
  }

  ctx.clients.channelManager.upsertMerchantConnection(
    data,
    ctx.body.connectorId
  )
}
