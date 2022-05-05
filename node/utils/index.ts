import { URL } from "url"

export const buildNotificationEndpoint = (connectorEndpoint: string, notificationPath: string) => {
  var url = new URL(connectorEndpoint)
  return url.origin + url.pathname.replace(/\/+$/, '') + notificationPath + url.search
}

export const getEndpointWithoutQueryString = (connectorEndpoint: string) => {
  var url = new URL(connectorEndpoint)
  return url.origin + url.pathname
}

export const getQueryStringFromEndpoint = (connectorEndpoint: string) => {
  var url = new URL(connectorEndpoint)
  return url.search
}
