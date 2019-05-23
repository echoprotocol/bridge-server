import * as config from 'config';
import { getLogger } from 'log4js';
import * as Raven from 'raven';
import { promisify } from 'util';
import AbstractInitableHelper from './abstract.initable.services';

const logger = getLogger('raven.helper');

export default class RavenService extends AbstractInitableHelper {
	private installed = false;

	async init() {
		if (!config.raven.enabled) logger.warn('Raven is disabled');
		else await this.install();
	}

	async install() {
		await promisify(Raven.config(config.raven.config).install)();
		this.installed = true;
	}

	uninstall() {
		Raven.uninstall();
		this.installed = false;
	}

	warning(message: string, additionalData = {}) {
		logger.warn(message, additionalData);
		this.sendMessageToRaven(message, 'warning', additionalData);
	}

	message(message: string, additionalData = {}) {
		logger.info(message, additionalData);
		this.sendMessageToRaven(message, 'info', additionalData);
	}

	error(error: Error, key: string, additionalData = {}) {
		if (!this.installed) return error;
		const extra = { ...additionalData, key };
		Raven.captureException(error, { extra });
	}

	private sendMessageToRaven(message: string, level: 'info' | 'warning', extra: {}) {
		if (!this.installed) return;
		Raven.captureMessage(message, { level, extra });
	}

}
