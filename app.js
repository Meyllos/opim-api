import express from 'express';
import bodyParser from 'body-parser';
import entryRouter from './server/routes/v1';
import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE } from './server/constantes/statusCodes';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use('/opim-api/v1', entryRouter);

app.use((req, res, next) => {
  const error = new Error('NOT FOUND');
  error.status = NOT_FOUND_CODE;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || INTERNAL_SERVER_ERROR_CODE);
  res.json({
    error: {
      message: error.message
    }
  });
});

export default app;
