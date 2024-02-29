import {
    AuthorizationHeader,
    errorSchema,
  } from '@DTO/index.dto';
import * as E from '@errors';
import { SchemaToInterface } from 'fastify-schema-to-ts';

//getWordbookList, addWordbook, hideWordbook, showWordbook

const wordbookType = {
    type: 'array',
    items: {
      type: 'object',
      required: ['id', 'title', 'createdAt', 'isHidden', 'vocaCount'],
      properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        createdAt: { type: 'string' },
        isHidden: { type: 'boolean' },
        vocaCount: { type: 'number' },
      },
    },
} as const;

export const getWordbookListSchema = {
    tags: ['Wordbook'],
    summary: '단어장 목록 조회',
    headers: AuthorizationHeader,
    response: {
      200: {
        type: "array",
        items: [wordbookType,wordbookType],
        minItems: 2,
        maxItems: 2,
      },
      ...errorSchema(
      )
    },
} as const;

export const createWordbookSchema = {
    tags: ['Wordbook'],
    summary: '단어장 목록 조회',
    headers: AuthorizationHeader,
    body: {
      type: 'object',
      required: ['title'],
      properties: {
        title: { type: 'string' },
      },
    },
    response: {
        201: {
          type: "array",
          items: [wordbookType,wordbookType],
          minItems: 2,
          maxItems: 2,
        },
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
        bookId: { type: 'number' },
      },
    },
    response: {
        200: {
          type: "array",
          items: [wordbookType,wordbookType],
          minItems: 2,
          maxItems: 2,
        },
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
        bookId: { type: 'number' },
      },
    },
    response: {
        200: {
          type: "array",
          items: [wordbookType,wordbookType],
          minItems: 2,
          maxItems: 2,
        },
        ...errorSchema(
        )
      },
} as const;

export type getWordbookListInterface = SchemaToInterface<typeof getWordbookListSchema> & { Body: { userId: string } };
export type createWordbookInterface = SchemaToInterface<typeof createWordbookSchema> & { Body: { userId: string } };
export type hideWordbookInterface = SchemaToInterface<typeof hideWordbookSchema> & { Body: { userId: string } };
export type showWordbookInterface = SchemaToInterface<typeof showWordbookSchema> & { Body: { userId: string } };
