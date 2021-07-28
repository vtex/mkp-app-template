import { VBASE_BUCKET, VBASE_CONFIG_BASE_PATH } from '../constants/variables'

export async function getConfiguration(_: unknown, __: unknown, ctx: Context) {
  return await ctx.clients.vbase.getJSON<Configuration>
  (VBASE_BUCKET, `${VBASE_CONFIG_BASE_PATH}/${ctx.vtex.account}`)
}
