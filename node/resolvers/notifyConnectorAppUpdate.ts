export async function notifyConnectorAppUpdate(
  _: unknown,
  { config }: { config: Configuration },
  ctx: Context) {
  return ctx.clients.connector.notifyConnectorAppUpdate(config)
}
