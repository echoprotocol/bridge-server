import FormatHelper from '../helpers/format.helper';
import { IQRParams } from '../interfaces/IQRParams';
import { imageSync } from 'qr-image';

export default class QRService {

	static async generateQR(qrParams: IQRParams) {
		return imageSync(
			FormatHelper.formatQRKey(qrParams.receiver, qrParams.currency, qrParams.amount),
			);
	}

}
