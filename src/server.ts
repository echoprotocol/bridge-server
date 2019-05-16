import * as config from 'config';
import * as log4js from 'log4js';
import { initInitableHelpers, initModule } from './_awilix';

const logger = log4js.getLogger();
logger.level = config.logger.level || 'info'; // FIXME: what for is config.logger.level?

async function main() {
	try {
		await initInitableHelpers();
		const moduleName = process.env.MODULE;
		logger.trace(`${moduleName} module initializing`);
		await initModule(process.env.MODULE);
	} catch (error) {
		logger.error(error);
	}
}

main();
