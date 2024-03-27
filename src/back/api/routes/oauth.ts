import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import * as Oauth from '@DTO/oauth.dto';
import OauthService from '@services/oauth.service';

const api: FastifyPluginAsync = async (server: FastifyInstance) => {
    server.get<Oauth.oauthRedirctInterface>(
        '/kakao',
        {
            schema: Oauth.oauthRedirctSchema
        },
        async (request, reply) => {
            const { accessToken, refreshToken } = await OauthService.kakao(request.query);
            reply.setCookie('authorization', refreshToken).redirect(303, `/login/${accessToken}`);
        }
    );
    server.get<Oauth.oauthRedirctInterface>(
        '/google',
        {
            schema: Oauth.oauthRedirctSchema
        },
        async (request, reply) => {
            const { accessToken, refreshToken } = await OauthService.google(request.query);
            reply.setCookie('authorization', refreshToken).redirect(303, `/login/${accessToken}`);
        }
    );
};

export default api;
