import express from 'express';
import helment from 'helmet';
import { Server } from 'http'
import logger from 'loglevel'
import morgan from 'morgan'

import errorMiddleware from './middleware/error'

const startServer = (port: string | number): Promise<Server> => {
  const app = express();
  app.use(morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'common'))
  app.use(helment());

  app.get('/', (_req, res) => res.send('Hello World!'))

  // 404 handler
  app.use((_req, res) => {
    res.status(404).send('Not found.')
  })

  app.use(errorMiddleware)

  return new Promise<Server>(resolve => {
    const server = app.listen(port, () => {
      logger.info(`Listening on port ${port}`)

      process.on('unhandledRejection', (reason, p) => {
        logger.warn('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
      });

      // For Docker graceful shutdown.
      const stop = (signal: string, code: number) => () => {
        logger.info(`Received ${signal}. Shutting down server.`);
        server.close(() => {
          logger.info('Server stopped.');
          process.exit(code);
        });
      };

      process.on('SIGINT', stop('SIGINT', 128 + 1));
      process.on('SIGTERM', stop('SIGTERM', 128 + 15));

      resolve(server)
    })
  });
}

export { startServer }
