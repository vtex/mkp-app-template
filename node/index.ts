import type { ClientsConfig, ServiceContext } from '@vtex/api'
import { LRUCache, Service } from '@vtex/api'
import { mapObjIndexed } from 'ramda'

import { Clients } from './clients'
import { mutations, queries } from './resolvers'
import { getConfig } from './routes/getConfig'
import { getConnectorConfig } from './routes/getConnectorConfig'

const prepare = (resolver: any) =>
  async function prepareContext(ctx: Context) {
    ctx.set('cache-control', 'no-cache')

    return resolver(ctx)
  }

const TIMEOUT_MS = 800

// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
  },
}

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients>
}

// Export a service that defines route handlers and client options.
export default new Service({
  clients,
  graphql: {
    resolvers: {
      Query: {
        ...queries,
      },
      Mutation: {
        ...mutations,
      },
    },
  },
  routes: mapObjIndexed(prepare, {
    getConfig,
    getConnectorConfig,
  }),
})
