import { FastifyInstance } from 'fastify';
import api from '@api';
import cookie, { FastifyCookieOptions } from '@fastify/cookie';
import productionFront from './productionFront';
import errorHandler from './errorHandler';
import config from '@config';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';

export default async (server: FastifyInstance): Promise<void> => {
    await server.register(cookie,{parseOptions:{
        httpOnly: true,
        path: '/',
    }} as FastifyCookieOptions);

    const isProduction = config.nodeEnv === 'production';
    if(!isProduction) {
        server.register(swagger, {
            prefix: '/docs',
            swagger: {
                info: {
                    title: 'Vocahub API',
                    version: '0.1.0'
                },
                consumes: ['application/json'],
                produces: ['application/json'],
                securityDefinitions: {
                    Authorization: {
                        type: 'apiKey',
                        name: 'authorization',
                        in: 'header'
                    }
                },
                security: [
                    {
                        Authorization: []
                    },
                ],
            }
        });
        server.register(swaggerUI, {
            prefix: '/docs',
            uiConfig: {
                docExpansion: 'full',
                deepLinking: false,
            },
            uiHooks: {
                onRequest: (request, reply, next) => {
                    next();
                }
            },
            staticCSP: true,
            transformStaticCSP: (header) => header,
            transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
            transformSpecificationClone: true
        });
    }
    
    server.setErrorHandler(errorHandler);
    await server.register(api, { prefix: '/api/v1' });
    
    if(isProduction) await productionFront(server);
}
