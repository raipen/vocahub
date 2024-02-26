import { AuthorizationHeader } from '@DTO/index.dto';
import { SchemaToInterface } from 'fastify-schema-to-ts';

const wordbookType = {
    type: 'array',
    items: {
      type: 'object',
      required: ['id', 'name', 'createdAt', 'isHidden', 'vocaCount'],
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
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
    },
} as const;

export const addWordbookSchema = {
    tags: ['Wordbook'],
    summary: '단어장 목록 조회',
    headers: AuthorizationHeader,
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' },
      },
    },
    response: {
        200: {
          type: "array",
          items: [wordbookType,wordbookType],
          minItems: 2,
          maxItems: 2,
        },
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
      },
} as const;

export type getWordbookListInterface = SchemaToInterface<typeof getWordbookListSchema>;
export type addWordbookInterface = SchemaToInterface<typeof addWordbookSchema>;
export type hideWordbookInterface = SchemaToInterface<typeof hideWordbookSchema>;
