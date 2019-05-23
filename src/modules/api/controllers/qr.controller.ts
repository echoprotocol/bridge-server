import AbstractController from './abstract.controller';
import ApiModule from '../api.module';
import * as HTTP from '../../../constants/http.constants';
import { QR_PATH } from '../../../constants/routes.constants';
import { QRProps } from '../../../types/api';
import QRService from '../../../services/qr.service';

export default class QRController extends AbstractController {

	constructor() {
		super();
	}

	initRoutes(addRoute: ApiModule['addRoute']) {
		addRoute(
			HTTP.METHOD.GET,
			QR_PATH,
			[this.getQR.bind(this)],
			HTTP.CONTENT_TYPE.PNG,
		);
	}

	public async getQR({ form }: QRProps) {
		try {
			return QRService.generateQR({ receiver: form.receiver, currency: form.currency, amount: form.amount });
		} catch (error) {
			this.parseError(error);
		}
	}

}
