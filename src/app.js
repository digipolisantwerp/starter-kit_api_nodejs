import async from 'async';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import responseHandler from 'digipolis-response';
import errorHandler from 'digipolis-error';
import routes from './routes';

let app;

function initializeDatabase(callback) {
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.MONGO_CONNECTIONSTRING, { useMongoClient: true });
  mongoose.connection.once('open', (err) => {
    if (err) {
      console.log('mongo error', err);
      return callback(err);
    }
    return callback();
  });
}

function initializeExpress(callback) {
  app = express();
  app.set('port', process.env.PORT);
  app.use(helmet());
  app.use(bodyParser.json({ limit: '4096kb' }));

  app.use(responseHandler());

  app.use(routes);

  app.use((err, req, res, next) => {
    console.log(err);
    return next(err);
  });
  app.use(errorHandler.middleware());

  // Status handler
  return callback();
}

function startListening(callback) {
  app.listen(app.get('port'), () => {
    console.log(`Express server listening on port ${app.get('port')}`);
    return callback();
  });
}

function start(cb) {
  async.series([
    initializeDatabase,
    initializeExpress,
    startListening,
  ], (err) => {
    if (err) {
      console.error(`Error occured ${err}`);
      return process.exit(1);
    }
    if (cb && typeof cb === 'function') {
      return cb(err);
    }
  });
}

function stop() {
  app.close();
}

export default {
  start,
  stop,
};
