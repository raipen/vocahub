import { User } from '@prisma/client';
import {
    AuthorizationHeader,
    errorSchema,
  } from '@DTO/index.dto';
import * as E from '@errors';
import { SchemaToInterface } from 'fastify-schema-to-ts';

export const signUpSchema = {
    tags: ['User'],
    summary: '회원 가입',
    body: {
      type: 'object',
      required: ['name', 'password'],
      properties: {
        name: { type: 'string'},
        password: { type: 'string'},
      },
    },
    response: {
      201: {
        type: 'object',
        description: '회원가입 성공 => 바로 로그인',
        required: ['accessToken'],
        properties: {
          accessToken: { type: 'string' }
        },
      },
      ...errorSchema(
      )
    },
} as const;

export const signInSchema = {
    tags: ['User'],
    summary: '로그인',
    body: {
      type: 'object',
      required: ['name', 'password'],
      properties: {
        name: { type: 'string'},
        password: { type: 'string'},
      },
    },
    response: {
      200: {
        type: 'object',
        description: '로그인 성공',
        required: ['accessToken'],
        properties: {
          accessToken: { type: 'string' }
        },
      },
      ...errorSchema(
        E.NotFoundError
      )
    },
} as const;

export const signOutSchema = {
    tags: ['User'],
    summary: '로그아웃',
    response: {
        200: {
            type: 'null',
            description: '로그아웃 성공',
        },
        ...errorSchema(
        )
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

export type signUpInterface = SchemaToInterface<typeof signUpSchema>;
export type signInInterface = SchemaToInterface<typeof signInSchema>;
export type signOutInterface = SchemaToInterface<typeof signOutSchema>;
export type refreshInterface = SchemaToInterface<typeof refreshSchema> & { Body: { userId: string } };
