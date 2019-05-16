import * as cors from 'cors';
import * as config from 'config';
import * as session from 'express-session';
import * as express from 'express';
import * as connectMongo from 'connect-mongo';
import * as passport from 'passport';
import * as bodyParser from 'body-parser';
import { connection } from 'mongoose';
import * as TIME from '../../constants/time.constant';
import * as HTTP from '../../constants/http.constants';

export function initMiddleware(app: express.Express) {
	initBodyParser(app);
	initCors(app);
	initSession(app);
	initPassport(app);
}

function initBodyParser(app: express.Express) {
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
}

function initCors(app: express.Express) {
	if (!config.cors) return;
	app.use(cors({
		origin: (_, cb) => cb(null, true),
		credentials: true,
		methods: Object.values(HTTP.CODE),
		allowedHeaders: ['x-user', 'X-Signature', 'accept', 'content-type'],
		// FIXME: or exposedHeaders ???
	}));
}

function initSession(app: express.Express) {
	const mongoStore = connectMongo(session);
	const sessionStore = new mongoStore({ mongooseConnection: connection });
	app.use(session({
		name: 'crypto.sid',
		secret: config.sessionSecret,
		cookie: { maxAge: TIME.WEEK },
		resave: false,
		saveUninitialized: false,
		rolling: true,
		store: sessionStore,
	}));
}

function initPassport(app: express.Express) {
	app.use(passport.initialize());
	app.use(passport.session());
	passport.serializeUser((user, done) => done(null, user));
	passport.deserializeUser((user, done) => done(null, user));
}
