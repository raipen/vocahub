import { FastifyInstance, FastifyPluginAsync, FastifySchema } from 'fastify';
import test from './routes/apiTest';
import user from './routes/user';
import vocaList from './routes/vocaList';
import wordbook from './routes/wordbook';

const api: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.register(test, { prefix: '/' });
  server.register(user, { prefix: '/user' });
  server.register(vocaList, { prefix: '/vocaList' });
  server.register(wordbook, { prefix: '/wordbook' });
};

export default api;
