import * as dotenv from 'dotenv'
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import consolidate from 'consolidate'
import url from 'url'
import cors from 'cors';

import indexRouter from './src/routes/index.js';

export const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

dotenv.config()

export const app = express();

app.set('view engine', 'html');
app.set('views', path.join(__dirname + 'src/views'));
app.engine('html', consolidate.mustache);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
