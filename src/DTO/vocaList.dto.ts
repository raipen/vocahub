import {
  AuthorizationHeader,
  errorSchema,
} from '@DTO/index.dto';
import * as E from '@errors';
import { SchemaToInterface } from 'fastify-schema-to-ts';

//getVocaList, saveVocaList, increaseCheckCount, decreaseCheckCount, deleteVoca
export const getVocaListSchema = {
  tags: ['Voca'],
  summary: '단어 목록 조회',
  headers: AuthorizationHeader,
  querystring: {
    type: 'object',
    required: ['bookId'],
    properties: {
      bookId: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'object',
      description: '단어 목록 조회 성공',
      required: ['wordbook', 'voca'],
      properties: {
        wordbook: { type: 'object', properties: { id: { type: 'number' }, name: { type: 'string' }, createdAt: { type: 'string' } } },
        voca: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, word: { type: 'string' }, meaning: { type: 'string' }, checkCount: { type: 'number' } } } },
      },
    },
    ...errorSchema(
    )
  },
} as const;


export const saveVocaListSchema = {
  tags: ['Voca'],
  summary: '단어 저장',
  headers: AuthorizationHeader,
  body: {
    type: 'object',
    required: ['bookId', 'voca'],
    properties: {
      bookId: { type: 'number' },
      voca: {
        type: 'array', items: {
          type: 'object',
          required: ['id', 'word', 'meaning'],
          properties: {
            id: { type: 'number', nullable: true },
            word: { type: 'string' },
            meaning: { type: 'array', items: { type: 'string' } },
          },
        }
      },
    },
  },
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          word: { type: 'string' },
          meaning: { type: 'string' },
          checkCount: { type: 'number' }
        }
      }
    },
    ...errorSchema(
    )
  },
} as const;


export const increaseCheckCountSchema = {
  tags: ['Voca'],
  summary: '단어 체크 카운트 증가',
  headers: AuthorizationHeader,
  body: {
    type: 'object',
    required: ['vocaId'],
    properties: {
      vocaId: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'null',
    },
    ...errorSchema(
    )
  },
} as const;

export const decreaseCheckCountSchema = {
  tags: ['Voca'],
  summary: '단어 체크 카운트 감소',
  headers: AuthorizationHeader,
  body: {
    type: 'object',
    required: ['vocaId'],
    properties: {
      vocaId: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'null',
    },
    ...errorSchema(
    )
  },
} as const;

export const deleteVocaSchema = {
  tags: ['Voca'],
  summary: '단어 삭제',
  headers: AuthorizationHeader,
  body: {
    type: 'object',
    required: ['vocaId'],
    properties: {
      vocaId: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'null',
    },
    ...errorSchema(
    )
  },
} as const;

export type getVocaListInterface = SchemaToInterface<typeof getVocaListSchema> & { Body: { userId: string } };
export type saveVocaListInterface = SchemaToInterface<typeof saveVocaListSchema> & { Body: { userId: string } };
export type increaseCheckCountInterface = SchemaToInterface<typeof increaseCheckCountSchema> & { Body: { userId: string } };
export type decreaseCheckCountInterface = SchemaToInterface<typeof decreaseCheckCountSchema> & { Body: { userId: string } };
export type deleteVocaInterface = SchemaToInterface<typeof deleteVocaSchema> & { Body: { userId: string } };
