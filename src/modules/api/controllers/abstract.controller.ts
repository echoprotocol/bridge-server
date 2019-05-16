import ApiModule from '../api.module';
import * as HTTP from '../../../constants/http.constants';
import ProcessingError from '../../../errors/processing.error';
import RestError from '../../../errors/rest.error';
import { ErrorMap } from '../../../types/error.map';

export default abstract class AbstractController {

	abstract initRoutes(addRestHandler: ApiModule['addRoute']): void;

	protected parseError(error: Error, allowedErrors: ErrorMap) {
		if (!(error instanceof ProcessingError)) throw error;
		// FIXME: why it cannot detect type? remove kostil'
		const details: HTTP.CODE | [HTTP.CODE, string?] = allowedErrors[error.message];
		// FIXME: use constant
		if (!details) throw new Error('unknown error');
		if (details instanceof Array) {
			const [code, message = HTTP.DEFAULT_MESSAGE[code]] = details;
			throw new RestError(code, message);
		} else throw new RestError(details, error.message);
	}

}
/*
	USER_SERVICE_ERROR.USER_NOT_FOUND: 404, // { status: 404, error: USER_SERVICE_ERROR.USER_NOT_FOUND }
	USER_SERVICE_ERROR.PASSWORD_REJECTED: [404, ERROR.USER_NOT_FOUND], // { statis: 404, error: ERROR.USER_NOT_FOUND }
	USER_SERVICE_ERROR.USER_ACCESS_DENIED: [403], // { status: 403, error: HTTP.DEFAULT_MESSAGE[403] }
*/
