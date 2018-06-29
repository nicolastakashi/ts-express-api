import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';

import responseExtensions from './infra/extensions/response.extensions';

const app = express();

app.response.error = responseExtensions.error;
app.response.success = responseExtensions.success;

app.use(morgan('dev', { skip: () => app.get('env') === 'test' }));
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

export default app;
