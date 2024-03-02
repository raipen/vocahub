import fastify from 'fastify';
import frontLoaders from '@frontLoaders';
import config from '@config';

const server = fastify({logger: false});
await frontLoaders(server);
try {
    await server.listen({port: config.devFrontPort, host: '0.0.0.0'});
} catch (err) {
    server.log.error(err);
    process.exit(1);
}
