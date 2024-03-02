import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import checkUser from '@fastifyHooks/checkUser';
import checkRefreshToken from '@fastifyHooks/checkRefreshToken';
import * as User from '@DTO/user.dto';
import userService from '@services/user.service';

const api: FastifyPluginAsync = async (server: FastifyInstance) => {
    server.post<User.signUpInterface>(
        '/signUp',
        {
            schema: User.signUpSchema
        },
        async (request, reply) => {
            const { accessToken, refreshToken } = await userService.signUp(request.body);
            reply.status(201).setCookie('authorization', refreshToken).send({ accessToken });
        }
    );
    server.post<User.signInInterface>(
        '/signIn',
        {
            schema: User.signInSchema
        },
        async (request, reply) => {
            const { accessToken, refreshToken } = await userService.signIn(request.body);
            reply.setCookie('authorization', refreshToken).send({ accessToken });
        }
    );
    server.post(
        '/signOut',
        {
            schema: User.signOutSchema
        },
        async (request, reply) => {
            reply.clearCookie('authorization').send();
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
};

export default api;
