import { saveConfiguration } from './saveConfig'
import { getConfiguration } from './getConfig'
import { getSalesChannels } from './getSalesChannels'
import { getMapperId } from './getMapperId'

export const mutations = {
  saveConfiguration,
}

export const queries = {
  getConfiguration,
  getSalesChannels,
  getMapperId,
}
