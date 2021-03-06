require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { notFoundErrorHandler, httpErrorHandler } = require('./middlewares/middlewares');
const { signInSchema, signUpSchema } = require('./middlewares/validator');
const auth = require('./middlewares/auth');
const { cors } = require('./middlewares/cors');
const { login, createUser } = require('./controllers/users');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(requestLogger);
app.use(cors);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', celebrate(signInSchema), login);
app.post('/signup', celebrate(signUpSchema), createUser);
app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);
app.use(errorLogger);
app.use('*', auth, notFoundErrorHandler);
app.use(errors());
app.use(httpErrorHandler);

app.listen(PORT);
