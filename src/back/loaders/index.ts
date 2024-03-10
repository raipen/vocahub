import { FastifyInstance } from 'fastify';
import api from '@api';
import cookie, { FastifyCookieOptions } from '@fastify/cookie';
import productionFront from './productionFront';
import errorHandler from './errorHandler';
import config from '@config';

export default async (server: FastifyInstance): Promise<void> => {
    await server.register(cookie,{parseOptions:{
        httpOnly: true,
        path: '/',
    }} as FastifyCookieOptions);
    
    server.setErrorHandler(errorHandler);
    await server.register(api, { prefix: '/api/v1' });

    const isProduction = config.nodeEnv === 'production';
    if(isProduction) await productionFront(server);
}
