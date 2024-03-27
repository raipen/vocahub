import { SchemaToInterface } from 'fastify-schema-to-ts';

export const oauthRedirctSchema = {
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

export type oauthRedirctInterface = SchemaToInterface<typeof oauthRedirctSchema>;
