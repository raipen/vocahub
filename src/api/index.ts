import { FastifyInstance, FastifyPluginAsync, FastifySchema } from 'fastify';
import test from './routes/apiTest';
import user from './routes/user';

const api: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.register(test, { prefix: '/' });
  server.register(user, { prefix: '/user' });
};

export default api;
