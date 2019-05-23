import RestError from './rest.error';
import * as HTTP from '../constants/http.constants';

declare type FormErrorDetail = {
	field: string,
	message: string,
	context: { [key: string]: string | number },
};

export default class FormError extends RestError {
	private pDetails: FormErrorDetail[] = [];

	constructor(message?: string) {
		super(HTTP.CODE.BAD_REQUEST, message);
	}

	get details() { return this.pDetails; }

}
