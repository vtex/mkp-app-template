export async function getConfiguration(_: unknown, __: unknown, ctx: Context) {
  return await ctx.clients.core.getConfigFromVBase(ctx.clients.vbase)
}
