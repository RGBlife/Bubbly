import * as dotenv from 'dotenv'
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import consolidate from 'consolidate'
import url from 'url'

// Importing routers
import indexRouter from './src/routes/index.js';

export const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// Init env variables
dotenv.config()

// Our app
export const app = express();

// View engine
app.set('view engine', 'html');
app.set('views', path.join(__dirname + 'src/views'));
app.engine('html', consolidate.mustache);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
