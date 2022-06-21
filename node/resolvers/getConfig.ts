export async function getConfiguration(_: unknown, __: unknown, ctx: Context) {
  return ctx.clients.configuration.getConfigFromVBase(ctx.clients.vbase)
}
