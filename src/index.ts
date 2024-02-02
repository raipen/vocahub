import {FastifyInstance} from 'fastify';
import serverSetting from '@server';
import config from '@config';


const startServer = async (server : FastifyInstance) => {
    try {
        await server.listen({port: config.port, host: '0.0.0.0'})
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}

(async () => {
    const settedServer:FastifyInstance = await serverSetting();
    startServer(settedServer);
})();
