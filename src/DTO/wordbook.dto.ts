import {
  AuthorizationHeader,
  errorSchema,
} from '@DTO/index.dto';
import * as E from '@errors';
import { SchemaToInterface } from 'fastify-schema-to-ts';

const wordbookType = {
  type: 'array',
  items: {
    type: 'object',
    required: ['uuid', 'title', 'createdAt', 'isHidden', 'vocaCount'],
    properties: {
      uuid: { type: 'string' },
      title: { type: 'string' },
      createdAt: { type: 'string' },
      isHidden: { type: 'boolean' },
      vocaCount: { type: 'number' },
    },
  },
} as const;

const returnType = {
  type: "object",
  required: ['wordbookList', 'hiddenWordbookList'],
  properties: {
    wordbookList: wordbookType,
    hiddenWordbookList: wordbookType,
  },
} as const;

export const getWordbookListSchema = {
  tags: ['Wordbook'],
  summary: '단어장 목록 조회',
  headers: AuthorizationHeader,
  response: {
    200: returnType,
  },
} as const;

export const createWordbookSchema = {
  tags: ['Wordbook'],
  summary: '단어장 생성',
  headers: AuthorizationHeader,
  body: {
    type: 'object',
    required: ['title'],
    properties: {
      title: { type: 'string' },
    },
  },
  response: {
    201: returnType,
    ...errorSchema(
    )
  },
} as const;

export const hideWordbookSchema = {
  tags: ['Wordbook'],
  summary: '단어장 숨기기',
  headers: AuthorizationHeader,
  body: {
    type: 'object',
    required: ['bookId'],
    properties: {
      bookId: { type: 'string' },
    },
  },
  response: {
    200: returnType,
    ...errorSchema(
    )
  },
} as const;

export const showWordbookSchema = {
  tags: ['Wordbook'],
  summary: '단어장 보이기',
  headers: AuthorizationHeader,
  body: {
    type: 'object',
    required: ['bookId'],
    properties: {
      bookId: { type: 'string' },
    },
  },
  response: {
    200: returnType,
    ...errorSchema(
    )
  },
} as const;

export type getWordbookListInterface = SchemaToInterface<typeof getWordbookListSchema> & { Body: { userId: string } };
export type createWordbookInterface = SchemaToInterface<typeof createWordbookSchema> & { Body: { userId: string } };
export type hideWordbookInterface = SchemaToInterface<typeof hideWordbookSchema> & { Body: { userId: string } };
export type showWordbookInterface = SchemaToInterface<typeof showWordbookSchema> & { Body: { userId: string } };
