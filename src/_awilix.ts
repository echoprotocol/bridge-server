import { asClass, asValue, createContainer, InjectionMode, Lifetime, listModules } from 'awilix';
import * as config from 'config';
import { getLogger } from 'log4js';
import { ERROR } from './errors/startup.error';
import AbstractInitableHelper from './helpers/abstract.initable.helper';
import AbstractModule from './modules/abstract.module';
import { dotsCaseToCamelCase } from './utils/common';

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

export async function initInitableHelpers() {
	const helpers = listModules('helpers/!(abstract)*.js');
	await Promise.all(helpers.map(async ({ name }) => {
		try {
			logger.trace(`${name} initializing`);
			const helper = container.resolve<Object | AbstractInitableHelper>(dotsCaseToCamelCase(name));
			if (helper instanceof AbstractInitableHelper) await helper.init();
		} catch (error) {
			logger.error(ERROR.CONNECTION_ERROR);
			throw error;
		}
	}));
}
