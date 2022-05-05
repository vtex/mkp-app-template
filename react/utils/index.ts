export const buildNotificationEndpointForDisplay = (connectorEndpoint: string, notificationPath: string) => {
  var expression = /^([^:\/\s]+:\/?\/?([^\/\s@]*@)?([^\/@:]*)?:?(\d+)?)?(\/[^?]*)?(\?[^#]*)?$/gi
  var match = new RegExp(expression).exec(connectorEndpoint)

  if (match) {
    var host = match[1]
    if (host) {
      var path = match[5] ? match[5].replace(/\/+$/, '') : ""
      return host + path + notificationPath
    }
  }

  return "Invalid connector endpoint"
}
