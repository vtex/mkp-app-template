export async function getConfiguration(_: unknown, __: unknown, ctx: Context) {
  return ctx.clients.core.getConfigFromVBase(ctx.clients.vbase)
}
