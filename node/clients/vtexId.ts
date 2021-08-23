import { JanusClient, IOContext, InstanceOptions } from '@vtex/api'

export default class VtexIDClient extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        VtexIdclientAutCookie: context.adminUserAuthToken ?? context.authToken ?? '',
      }
    })
  }

  public async validateAppKeyAppToken(vendor: string, appKey: string, appToken: string){
    var tokenInfo = await this.getTokenInfo(appKey, appToken)
    if(!tokenInfo || tokenInfo.authStatus !== "Success")
      return false
    return this.validateUserAccess(vendor, tokenInfo.userId)
  }

  private getTokenInfo = async (appKey: string, appToken: string) =>
    this.http.get<TokenInfo>('api/vtexid/pub/authenticate/default', {
      params: {
        an: this.context.account,
        user: appKey,
        pass: appToken
      }
    }).then((res) => {
      return res
    })

  private validateUserAccess = async (vendor: string, userId: string) =>
    this.http.get<boolean>(`api/pvt/accounts/${vendor}/logins/${userId}/granted`, {
    }).then((res) => {
      return res
    })
}
