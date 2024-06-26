import fastify, {FastifyInstance} from 'fastify';
import loaders from '@loaders';

const backendServer = async () : Promise <FastifyInstance> => {
    const server = fastify({logger: process.env.NODE_ENV === 'development'});
    await loaders(server);
    return server;
}

export default backendServer;
