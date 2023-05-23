const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { PORT, DB_URI } = require('./config');

const app = express();

const catchErrorsMiddleware = require('./middlewares/catchErrors');
const { requestLogger } = require('./middlewares/logger');

const allowedCors = [
  'localhost',
  'localhost:3001',
  'http://localhost',
  'http://localhost:3001',
  'http://localhost:3001/',
];

const corsOptions = {
  // origin: allowedCors,
  // maxAge: 30,
  optionsSuccessStatus: 200,
};

app.use(express.json());

mongoose.connect(DB_URI, {});

app.use(requestLogger);

app.use(cors(corsOptions));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', require('./routes/index'));

app.use(catchErrorsMiddleware);

app.listen(PORT, () => {});
