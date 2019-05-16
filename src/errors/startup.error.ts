import AbstractError from './abstract.error';

// TODO: add process exit code ??
export class StartUpError extends AbstractError {

	constructor(message: string) {
		super(message);
	}

}

export const ERROR = {
	CONNECTION_ERROR: 'connection error',
	ENV_PATH_CAN_NOT_REACHED: 'path of environment path can not be reached',
	HELPER_INITION_ERROR: 'error on helper init',
};
