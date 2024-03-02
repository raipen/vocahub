import { FastifyInstance, FastifyPluginAsync, FastifySchema } from 'fastify';
import { NotDefinedOnConfigError } from '@errors/index';

const test: FastifyPluginAsync = async (server: FastifyInstance) => {
  const testSchema: FastifySchema = {
    response: {
      200: {
        type: 'object',
        properties: {
          data: { type: 'string' },
        },
      },
    },
  };
  server.get('/ping', { schema: testSchema }, async (req, rep) => {
    return { data: 'pong' };
  });
  server.post('/notDefinedOnConfigerror', async (req, rep) => {
    throw new NotDefinedOnConfigError('notDefinedOnConfigerror');
  });
  server.post('/notDefinederror', async (req, rep) => {
    throw new Error('notDefinederror');
  });
};
export default test;
