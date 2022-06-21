import { saveConfiguration } from './saveConfig'
import { getConfiguration } from './getConfig'
import { getSalesChannels } from './getSalesChannels'
import { createSalesChannel } from './createSalesChannel'

export const mutations = {
  saveConfiguration,
  createSalesChannel
}

export const queries = {
  getConfiguration,
  getSalesChannels,
}
