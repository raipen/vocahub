import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import checkUser from '@fastifyHooks/checkUser';
import checkRefreshToken from '@fastifyHooks/checkRefreshToken';
import * as User from '@DTO/user.dto';
import userService from '@services/user.service';

const api: FastifyPluginAsync = async (server: FastifyInstance) => {
    server.post(
        '/logout',
        {
            schema: User.signOutSchema
        },
        async (_, reply) => {
            reply.clearCookie('authorization').redirect(303, '/');
        }
    );
    server.post(
        '/refresh',
        {
            schema: User.refreshSchema,
            preValidation: checkRefreshToken
        },
        async (request, reply) => {
            const { accessToken } = await userService.refresh(request.body);
            reply.send({ accessToken });
        }
    );
    server.get<User.profileInterface>(
        '/profile',
        {
            schema: User.profileSchema,
            preValidation: checkUser
        },
        async (request, reply) => {
            const profile = await userService.getProfile(request.body);
            reply.status(200).send(profile);
        }
    );
};

export default api;
