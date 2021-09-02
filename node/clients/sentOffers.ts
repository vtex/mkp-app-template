import { IOContext, InstanceOptions, JanusClient, IOResponse, UserInputError} from '@vtex/api'
import { CONFLIT_STATUS_CODE, NOT_FOUND, SUCCESS_CODE } from '../constants/statusCode'

export default class SentOffers extends JanusClient {

	private routes = {
		activeFeed: () => '/api/sent-offers/feeds',
		updateFeedById: (feedId: string) => `/api/sent-offers/feeds/${feedId}`,
        getFeedById: (feedId: string) => `/api/sent-offers/feeds/${feedId}`
	}

	constructor(ctx: IOContext, options?: InstanceOptions){
		super(
			ctx, 
			{
				...options,
				headers: {
					VtexIdclientAutCookie: ctx.adminUserAuthToken ?? ctx.authToken ?? '',
				}
			}
		)
	}

	public async createFeed(data: FeedCreationData) {

		const createResponse: any = await this.http.postRaw(
			this.routes.activeFeed(),
			data,
			{
				params: {
					an: this.context.account
				},
				validateStatus: (status: number) => true || status
			}
		)

		// You already created the feed
		if(createResponse.status === CONFLIT_STATUS_CODE){

			const updateResponse: IOResponse<any> = await this.http.putRaw(
				this.routes.updateFeedById(data.id),
				data,
				{
					params: {
						an:this.context.account

					}
				}
			)

			if(updateResponse.status !== SUCCESS_CODE)
				throw new UserInputError('admin/vtex.sentOffers')
		}

		if(createResponse.status === NOT_FOUND)
			throw new UserInputError('admin/vtex.sentOffers')
	}
}