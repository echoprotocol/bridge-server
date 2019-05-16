import RestError from './rest.error';
import * as HTTP from '../constants/http.constants';

declare type FormErrorDetail = {
	field: string,
	message: string,
	context: { [key: string]: string | number },
};

export default class FormError extends RestError {
	private pDetails: FormErrorDetail[] = []; // FIXME: rename to _details and configure tslint

	constructor(message?: string) {
		super(HTTP.CODE.BAD_REQUEST, message);
	}

	add(field: FormErrorDetail['field'], message: FormErrorDetail['message'], context: FormErrorDetail['context']) {
		// FIXME: remove checking when adding from joi?
		const keys = Object.keys(context);
		const findResult = message.match(new RegExp(`(${keys.join('|')})`, 'g'));
		// FIXME: error message
		if (!findResult || findResult.length !== keys.length) throw new Error('not all variables used');
		this.pDetails.push({ field, message, context });
	}

	get details() { return this.pDetails; }

}
