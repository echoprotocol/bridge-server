import { promisify } from 'util';
import { getLogger } from 'log4js';
import * as config from 'config';
import AbstractModule from '../abstract.module';
import * as express from 'express';
import { initMiddleware } from './middleware';
import RestError from '../../errors/rest.error';
import FormError from '../../errors/form.error';
import * as HTTP from '../../constants/http.constants';
import { Response, Request } from 'express-serve-static-core';
import { Action, Handler } from '../../types/api';
import QRController from './controllers/qr.controller';
import RavenService from '../../services/raven.service';

const logger = getLogger('api.module');

export default class ApiModule extends AbstractModule {
	private app: express.Express;

	constructor(readonly qrController: QRController, readonly ravenService: RavenService) {
		super();
	}

	async init() {
		this.app = express();
		initMiddleware(this.app);
		await promisify(this.app.listen.bind(this.app))(config.port);
		logger.info('API application listens to', config.port, 'port');
		this.initRoutes();
	}

	initRoutes() {
		const controllers = [
			this.qrController,
		];
		for (const controller of controllers) {
			controller.initRoutes(this.addRoute.bind(this));
		}

		if (config.env === 'development') this.app.use('/apidoc', express.static('apidoc'));
		this.addRoute(HTTP.METHOD.GET, '*', [
			() => { throw new RestError(HTTP.CODE.METHOD_NOT_ALLOWED); },
		]);
	}

	addRoute(
		method: HTTP.METHOD,
		route: string,
		[action, ...handlers]: [Action, ...Handler[]],
		contentType = HTTP.CONTENT_TYPE.JSON,
	) {
		this.app[method](route, async (req, res) => {
			try {
				req.form = { ...req.query, ...req.params, ...req.body };
				this.traceRequest(req, req.form);
				handlers.forEach((handler) => handler(req));
				const result: any = await action({ req, form: req.form });
				res.setHeader('Content-Type', contentType);
				res.status(HTTP.CODE.OK).send(result);
			} catch (error) {
				if (!(error instanceof RestError)) {
					logger.error(error);
					this.ravenService.error(error, 'api#handleRequest', { method, route, form: req.form });
					this.sendError(res, new RestError(HTTP.CODE.INTERNAL_SERVER_ERROR));
				} else this.sendError(res, error);
			}
		});
	}

	private sendError(res: Response, error: RestError | FormError) {
		res.status(error.code).json({
			error: error instanceof FormError ? error.details : error.message,
			status: error.code,
		});
	}

	private traceRequest(req: Request, form: Express.Request['form']) {
		if (!config.traceApiRequests) return;
		form = { ...form };
		logger.trace(`${req.method.toUpperCase()} Request ${req.originalUrl}`, JSON.stringify(form));
	}

}
