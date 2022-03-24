export async function getMapperId(_: unknown, __: unknown, ctx: Context) {
  const storedId = await ctx.clients.core.getMapperIdFromVBase(ctx.clients.vbase)
  console.log(storedId)
  if (storedId != null)
  {
    return storedId
  }
  const createdId = await ctx.clients.mapper.registerMapper()
  ctx.clients.core.saveMapperIdInVBase(createdId, ctx.clients.vbase)
  return createdId
}
