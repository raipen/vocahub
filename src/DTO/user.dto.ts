import {
  AuthorizationHeader,
  errorSchema,
} from '@DTO/index.dto';
import * as E from '@errors';
import { SchemaToInterface } from 'fastify-schema-to-ts';

export const signOutSchema = {
  tags: ['User'],
  summary: '로그아웃',
  response: {
    303: {
    },
  },
} as const;

export const refreshSchema = {
  tags: ['User'],
  summary: '토큰 재발급',
  response: {
    200: {
      type: 'object',
      description: '토큰 재발급 성공',
      required: ['accessToken'],
      properties: {
        accessToken: { type: 'string' }
      },
    },
    ...errorSchema(
      E.NoAuthorizationInCookieError,
      E.UserAuthorizationError
    )
  },
} as const;

export const profileSchema = {
  tags: ['User'],
  summary: '프로필 조회',
  headers: AuthorizationHeader,
  response: {
    200: {
      type: 'object',
      description: '프로필 조회 성공',
      required: ['name', 'wordbookCount', 'vocaCount', 'loginDate'],
      properties: {
        name: { type: 'string' },
        wordbookCount: { type: 'number' },
        vocaCount: { type: 'number' },
        loginDate: {
          type: 'array',
          items: {
            type: 'object',
            required: ['date', 'count'],
            properties: {
              date: { type: 'string' },
              count: { type: 'number' },
            },
          },
        },
      },
    },
    ...errorSchema(
    )
  },
} as const;

export type signOutInterface = SchemaToInterface<typeof signOutSchema>;
export type refreshInterface = SchemaToInterface<typeof refreshSchema> & { Body: { userId: string } };
export type profileInterface = SchemaToInterface<typeof profileSchema> & { Body: { userId: string } };
