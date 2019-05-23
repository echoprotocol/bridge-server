import BN from 'bignumber.js';

import { ID_PREFIX, ECHO_ASSET_ID } from '../constants/echo.constants';

export default class FormatHelper {
	static formatQRKey(receiver: string, currency: string, amount: number) {
		const currencyType = currency.split('-')[0];
		const currencyId = currency.split('-')[1];
		const idPrefix = currencyType ? ID_PREFIX[currencyType] : null;

		const formattedCurrency = (idPrefix && currencyId)
			? `${idPrefix}.${currencyId}`
			: ECHO_ASSET_ID;

		amount = new BN(amount).isInteger() ? amount : 0;

		return `${formattedCurrency}:${receiver}?amount=${amount}`;
	}
}
