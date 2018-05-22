import dotenv from 'dotenv';
import app from './app';

dotenv.config({
  path: (process.env.NODE_ENV === 'test' ? '.env.test' : '.env'),
});

app.start((err) => {
  if (err) {
    console.error(`Error=${err}`);
  }
  console.info('app bootstrap finished');
});
