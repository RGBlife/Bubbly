import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';

const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index');
});

export default router
