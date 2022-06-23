export async function getSalesChannel(_: unknown, { salesChannelId }: { salesChannelId: string }, ctx: Context) {
  if (!salesChannelId)
    return null
  return ctx.clients.catalog.getSalesChannel(salesChannelId)
}
