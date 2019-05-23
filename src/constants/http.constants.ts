export enum CONTENT_TYPE {
	JSON = 'application/json',
	PNG = 'image/png',
}

export enum METHOD {
	GET= 'get',
	PUT= 'put',
	POST= 'post',
	PATCH= 'patch',
	DELETE= 'delete',
}

export enum CODE {
	OK = 200,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	METHOD_NOT_ALLOWED = 405,
	UNPROCESSABLE_ENTITY = 422,
	UPGRADE_REQUIRED = 426,
	INTERNAL_SERVER_ERROR = 500,
}

export const DEFAULT_MESSAGE: { [key in CODE]: string } = {
	[CODE.OK]: 'ok',
	[CODE.BAD_REQUEST]: 'bad request',
	[CODE.UNAUTHORIZED]: 'unauthorized',
	[CODE.FORBIDDEN]: 'access denied',
	[CODE.NOT_FOUND]: 'not found',
	[CODE.METHOD_NOT_ALLOWED]: 'method not allowed',
	[CODE.UNPROCESSABLE_ENTITY]: 'unprocessable entity',
	[CODE.UPGRADE_REQUIRED]: 'method was removed',
	[CODE.INTERNAL_SERVER_ERROR]: 'server side error',
};
