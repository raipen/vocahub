import backendServer from '@server';
import config from '@config';

const server = await backendServer();
try {
    await server.listen({port: config.port, host: '0.0.0.0'})
} catch (err) {
    server.log.error(err);
    process.exit(1);
}
