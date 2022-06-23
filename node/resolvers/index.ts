import { saveConfiguration } from './saveConfig'
import { getConfiguration } from './getConfig'
import { getSalesChannel } from './getSalesChannel'
import { createSalesChannel } from './createSalesChannel'

export const mutations = {
  saveConfiguration,
  createSalesChannel
}

export const queries = {
  getConfiguration,
  getSalesChannel,
}
