import { LoginToken } from '@serverUtils/jwt';
import { FastifyRequest, FastifyReply, FastifyError } from 'fastify';
import { NoAuthorizationInCookieError } from '@errors/index';

export default async (
  request: FastifyRequest<{ Body: { userId: string } }>,
  reply: FastifyReply,
  done: (err?: FastifyError) => void
) => {
  const authorization = request.cookies.authorization;
  if (!authorization) {
    throw new NoAuthorizationInCookieError('쿠키에 Authorization이 없습니다');
  }

  if(!request.body)
    request.body = { userId: "" };
  request.body.userId = LoginToken.getUserIdFromRefreshToken(authorization);
};
