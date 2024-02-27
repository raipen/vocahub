import { FastifyInstance } from 'fastify';
import api from '@api';
import cookie, { FastifyCookieOptions } from '@fastify/cookie';

export default async (server: FastifyInstance): Promise<void> => {
    server.register(cookie,{parseOptions:{
        httpOnly: true,
        path: '/',
    }} as FastifyCookieOptions);
    server.register(api, { prefix: '/api/v1' });
}
