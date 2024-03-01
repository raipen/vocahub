import {FastifyInstance} from 'fastify';
import {backendServer,frontServer} from '@server';
import config from '@config';


const startServer = async (server : FastifyInstance,port:number) => {
    try {
        await server.listen({port: port, host: '0.0.0.0'})
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}

(async () => {
    startServer(await backendServer(),config.port);
    if(config.nodeEnv === 'production') return;
    startServer(await frontServer(),config.devFrontPort);
})();
