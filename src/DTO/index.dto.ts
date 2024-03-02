import { FromSchema, JSONSchema } from 'json-schema-to-ts';
import ErrorConfig from '@errors/config';
import { ErrorWithToast } from '@errors';
export const AuthorizationHeader = {
  type: 'object',
  properties: {
    authorization: { type: 'string' },
  },
  required: ['authorization'],
} as const;

type ErrorSchema = {
  type: 'object',
  description: string,
  required: ['error','message','toast'],
  properties: {
    error: { type: 'string', enum: string[] },
    message: { type: 'string'},
    toast: { type: 'string', enum: string[] }
  }
};

export const errorSchema = (...errors: Array<new (message:string,...any:any) => ErrorWithToast>) => {
  const errorConfigs = errors.map((error) => ErrorConfig[error.name]);
  return errorConfigs.reduce((acc, cur) => {
    const errorInstance = new cur.error("");
    if(acc[cur.code]) {
      acc[cur.code].properties.error.enum.push(errorInstance.name);
      acc[cur.code].description += `\n${cur.describtion}`;
      acc[cur.code].properties.toast.enum.push(cur.toast(errorInstance));
      return acc;
    }
    acc[cur.code] = {
      type: 'object',
      description: cur.describtion,
      required: ['error','message','toast'],
      properties: {
        error: { type: 'string', enum: [errorInstance.name] },
        message: { type: 'string'},
        toast: { type: 'string', enum: [cur.toast(errorInstance)] }
      }
    }
    return acc;
  },{} as Record<number,ErrorSchema>);
};

export type ErrorInterface = FromSchema<ErrorSchema>;
