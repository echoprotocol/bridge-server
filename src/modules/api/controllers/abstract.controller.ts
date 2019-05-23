import ApiModule from '../api.module';
import * as HTTP from '../../../constants/http.constants';
import RestError from '../../../errors/rest.error';
import { ErrorMap } from '../../../types/error.map';
import AbstractError from '../../../errors/abstract.error';

export default abstract class AbstractController {

	abstract initRoutes(addRestHandler: ApiModule['addRoute']): void;

	protected parseError(error: Error, allowedErrors?: ErrorMap) {
		if (!(error instanceof AbstractError)) throw error;
		if (!allowedErrors) throw error;

		const details: HTTP.CODE | [HTTP.CODE, string?] = allowedErrors[error.message];

		if (!details) throw new Error('unknown error');
		if (details instanceof Array) {
			const [code, message = HTTP.DEFAULT_MESSAGE[code]] = details;
			throw new RestError(code, message);
		} else throw new RestError(details, error.message);
	}

}
