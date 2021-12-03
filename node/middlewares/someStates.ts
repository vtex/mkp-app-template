export async function someStates(
  ctx: StatusChangeContext,
  next: () => Promise<any>
) {
  const { clients } = ctx
  await clients.notificator.notifyOrderStatusChange(ctx.body)

  await next()
}
