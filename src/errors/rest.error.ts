import AbstractError from './abstract.error';
import * as HTTP from '../constants/http.constants';

// FIXME: rename ?
export default class RestError extends AbstractError {

	constructor(readonly code: HTTP.CODE, message?: string) {
		super(message);
		if (!message) this.message = HTTP.DEFAULT_MESSAGE[code];
	}

}
