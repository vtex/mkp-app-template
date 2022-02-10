import { saveConfiguration } from './saveConfig'
import { getConfiguration } from './getConfig'
import { getSalesChannels } from './getSalesChannels'
import { notifyConnectorAppUpdate } from './notifyConnectorAppUpdate'

export const mutations = {
  saveConfiguration,
  notifyConnectorAppUpdate,
}

export const queries = {
  getConfiguration,
  getSalesChannels,
}
