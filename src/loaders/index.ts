import { FastifyInstance } from 'fastify';
import api from '@api';
import cookie, { FastifyCookieOptions } from '@fastify/cookie';
import productionFront from './productionFront';
import developmentFront from './developmentFront';
import config from '@config';
import fastifyMiddie from '@fastify/middie';

export default async (server: FastifyInstance): Promise<void> => {
    await server.register(cookie,{parseOptions:{
        httpOnly: true,
        path: '/',
    }} as FastifyCookieOptions);

    await server.register(fastifyMiddie);
    const isProduction = config.nodeEnv === 'production';
    if(isProduction){
        await productionFront(server);
    } else{
        await developmentFront(server);
    }

    await server.register(api, { prefix: '/api/v1' });
}
