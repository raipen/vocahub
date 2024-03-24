import { SchemaToInterface } from 'fastify-schema-to-ts';

export const kakaoSchema = {
    tags: ['User'],
    summary: '로그인',
    querystring: {
        type: 'object',
        properties: {
            code: { type: 'string' },
            error: { type: 'string' },
        },
    },
    response: {
        303: {
        },
    },
} as const;

export type kakaoInterface = SchemaToInterface<typeof kakaoSchema>;
