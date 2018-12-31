import app from './server';
import config from './config';

app.listen(config.serverPort, async () => {
  console.log(`Running phone-book-api-server on port ${config.serverPort}`);
});
