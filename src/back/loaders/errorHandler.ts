import { FastifyRequest, FastifyReply, FastifyError } from 'fastify';
import { ErrorWithToast, ValidationError,NotFoundError } from '@errors';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import ErrorConfig from '@errors/config';

const handleKnownError = (error: ErrorWithToast, reply: FastifyReply) => {
  const knownError = ErrorConfig[error.name];
  if (knownError) {
    return reply
      .code(knownError.code)
      .send({
        error: error.name,
        message: error.message,
      });
  }
  return reply.code(500).send({
    error: error.name,
    message: '정의되지 않은 에러가 발생했습니다.',
  });
}

export default (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
  ) => {
  if (error instanceof ErrorWithToast) return handleKnownError(error, reply);
  if (error.validation) {
    return reply.code(400).send({
      error:  ValidationError.name,
      message: error.message,
    });
  }
  if(error instanceof PrismaClientKnownRequestError) {
    if(error.code === 'P2025') {
      return reply.code(404).send({
        error: NotFoundError.name,
        message: '요청하신 데이터를 찾을 수 없습니다.',
      });
    }
    //error.toast = '잘못된 데이터가 입력되었습니다.';
    return reply.code(400).send(error);
  }
  
  return reply.code(500).send({
    error: error.name,
    message: error.message,
  });
};
