export const buildNotificationEndpoint = (connectorEndpoint: string, notificationPath: string) => {
  var expression = /^([^:\/\s]+:\/?\/?([^\/\s@]*@)?([^\/@:]*)?:?(\d+)?)?(\/[^?]*)?(\?[^#]*)?$/gi
  var match = new RegExp(expression).exec(connectorEndpoint)

  if (match) {
    var host = match[1]
    var path = match[5] ? match[5].replace(/\/+$/, '') : ""
    var query = match[6] ?? ""

    return host + path + notificationPath + query
  }

  return ""
}
