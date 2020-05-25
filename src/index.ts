import config from 'config';
import express from 'express';
import helment from 'helmet';

const app = express();
app.use(helment());

app.get('/', (_req, res) => res.send('Hello World!'))

const port = config.get<string | number>('port');
const server = app.listen(port, () => console.log(`App listening at http://localhost:${port}`))

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});

// For Docker graceful shutdown.
const stop = (signal: string, code: number) => () => {
  console.log(`Received ${signal}. Shutting down server.`);
  server.close(() => {
    console.log('Server stopped.');
    process.exit(code);
  });
};

process.on('SIGTERM', stop('SIGINT', 128 + 1));
process.on('SIGTERM', stop('SIGTERM', 128 + 15));

