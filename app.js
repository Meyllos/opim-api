import express from 'express';
import bodyParser from 'body-parser';
import entryRouter from './server/routes/v1';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// CORPS : allowing orgins
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use('opim-api/', entryRouter);

app.use((req, res, next) => {
  const error = new Error('NOT FOUND');
  error.status = 403;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status);
  res.json({
    error: {
      message: error.message
    }
  });
});

export default app;
