import { LoginToken } from '@serverUtils/jwt';
import { FastifyRequest, FastifyReply, FastifyError } from 'fastify';
import { NoAuthorizationInHeaderError } from '@errors/index';

export default async (
  request: FastifyRequest<{ Body: { userId: string } }>,
  reply: FastifyReply,
  done: (err?: FastifyError) => void
) => {
  const authorization = request.headers.authorization;
  if (!authorization) {
    throw new NoAuthorizationInHeaderError('헤더에 Authorization이 없습니다');
  }

  const replace_authorization = authorization.replace('Bearer ', '');

  if(!request.body)
    request.body = { userId: "" };
  request.body.userId = LoginToken.getUserIdFromAccessToken(replace_authorization);
};
