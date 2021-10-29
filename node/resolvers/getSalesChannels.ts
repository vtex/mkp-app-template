export async function getSalesChannels(_: unknown, __: unknown, ctx: Context) {
  return ctx.clients.core.getSalesChannelsAsync()
}
