import fastify, {FastifyInstance} from 'fastify';
import loaders from '@loaders';
import frontLoaders from '@frontLoaders';

const backendServer = async () : Promise <FastifyInstance> => {
    const server = fastify({logger: process.env.NODE_ENV === 'development'});
    await loaders(server);
    return server;
}

const frontServer = async () : Promise <FastifyInstance> => {
    const server = fastify({logger: false});
    await frontLoaders(server);
    return server;
}

export {backendServer, frontServer};
