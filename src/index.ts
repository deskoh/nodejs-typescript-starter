import config from 'config';
import logger from 'loglevel'

import { startServer } from './app'
logger.setLevel('info')

const port = config.get<string | number>('port');
void startServer(port)
