import { asClass, asValue, createContainer, InjectionMode, Lifetime, listModules } from 'awilix';
import * as config from 'config';
import { getLogger } from 'log4js';
import AbstractModule from './modules/abstract.module';
import AbstractInitableServices from './services/abstract.initable.services';
import { dotsCaseToCamelCase } from './utils/common';
import { ERROR } from './errors/startup.error';

const logger = getLogger('awilix');

const container = createContainer({ injectionMode: InjectionMode.PROXY });
container.loadModules([
	['services/!(abstract)*.js', { register: asClass }],
	['helpers/!(abstract)*.js', { register: asClass }],
	['connections/!(abstract)*.js', { register: asClass }],
	['repositories/!(abstract)*.js', { register: asClass }],
], {
	formatName: 'camelCase',
	resolverOptions: {
		injectionMode: InjectionMode.CLASSIC,
		lifetime: Lifetime.SINGLETON,
	},
});
container.register({
	basePath: asValue(__dirname),
	config: asValue(config),
});

export async function initModule(name: string) {
	const scope = container.createScope();
	scope.loadModules([
		`modules/${name}/${name}.module.js`,
		`modules/${name}/*/*.js`,
	], {
		formatName: 'camelCase',
		resolverOptions: {
			injectionMode: InjectionMode.CLASSIC,
			lifetime: Lifetime.SCOPED,
		},
	});
	const module = scope.resolve<AbstractModule>(`${name}Module`);
	await module.init();
}

export async function initInitableServices() {
	const services = listModules('services/!(abstract)*.js');
	await Promise.all(services.map(async ({ name }) => {
		try {
			logger.trace(`${name.replace('.', ' ')} initializing`);
			const service = container.resolve<Object | AbstractInitableServices>(dotsCaseToCamelCase(name));
			if (service instanceof AbstractInitableServices) await service.init();
		} catch (error) {
			logger.error(ERROR.CONNECTION_ERROR);
			throw error;
		}
	}));
}
