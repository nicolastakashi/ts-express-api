import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import raven from 'raven';

import responseExtensions from './infra/extensions/response.extensions';
import passportStrategies from './infra/auth/passport.strategies';
import sentryConfig from './infra/sentry/sentry.config';
import routes from './routes';

const app = express();

app.response.error = responseExtensions.error;
app.response.success = responseExtensions.success;

app.use(sentryConfig.config());

app.use(morgan('dev', { skip: () => app.get('env') === 'test' }));
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

passport.use('jwt', passportStrategies.jwt);

app.use('/', express.static('apidoc'));
app.use('/api', routes);

app.use(raven.errorHandler());

export default app;
