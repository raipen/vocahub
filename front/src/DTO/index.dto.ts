import { FromSchema, JSONSchema } from 'json-schema-to-ts';
export const AuthorizationHeader = {
  type: 'object',
  properties: {
    authorization: { type: 'string' },
  },
  required: ['authorization'],
} as const;

export type ErrorInterface = FromSchema<{
  type: 'object',
  description: string,
  required: ['error','message','toast'],
  properties: {
    error: { type: 'string', enum: string[] },
    message: { type: 'string'},
    toast: { type: 'string', enum: string[] }
  }
}>;
