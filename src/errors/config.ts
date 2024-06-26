import * as E from '@errors';
export type ErrorConfigType = {
  error: new (message: string, ...any: any) => E.ErrorWithToast;
  code: number;
  toast: (error: any) => string;
  describtion: string;
};
const ErrorConfigArray: ErrorConfigType[] = [
  {
    describtion: '요청이 잘못되었습니다.',
    error: E.ValidationError,
    code: 400,
    toast: (error: E.ErrorWithToast) => `누락된 정보가 있습니다.`,
  },
  {
    describtion: '요청은 성공했으나, 응답을 제공할 데이터가 없습니다.',
    error: E.NotFoundError,
    code: 404,
    toast: (error: E.NotFoundError) =>
      `${error.missing}을(를) 찾을 수 없습니다.`,
  },
  {
    describtion: '토큰이 만료되었거나, 유효하지 않습니다.',
    error: E.UserAuthorizationError,
    code: 401,
    toast: (error: E.ErrorWithToast) => `다시 로그인 해주세요.`,
  },
  {
    describtion: '쿠키에 인증 정보가 없습니다.',
    error: E.NoAuthorizationInCookieError,
    code: 400,
    toast: (error: E.ErrorWithToast) => `인증 정보가 없습니다.`,
  },
  {
    describtion: '헤더에 인증 정보가 없습니다.',
    error: E.NoAuthorizationInHeaderError,
    code: 400,
    toast: (error: E.ErrorWithToast) => `인증 정보가 없습니다.`,
  },
  {
    describtion: '입력된 값이 양식에 맞지 않습니다.',
    error: E.NotCorrectTypeError,
    code: 400,
    toast: (error: E.NotCorrectTypeError) =>
      `입력된 ${error.unCorrect}이(가) 양식과 맞지 않습니다.`,
  },
  {
    describtion: '이미 등록된 값이 있습니다.',
    error: E.ExistError,
    code: 409,
    toast: (error: E.ExistError) => `입력된 ${error.exist}가 이미 존재합니다.`,
  },
  {
    describtion: '토큰이 유효하지 않습니다.',
    error: E.UncorrectTokenError,
    code: 403,
    toast: (error: E.ErrorWithToast) => '토큰이 유효하지 않습니다.',
  },
  {
    describtion: '토큰 만료',
    error: E.ExpiredAccessTokenError,
    code: 401,
    toast: (error: E.ErrorWithToast) => '세션이 만료되었습니다. 다시 로그인해주세요.',
  },
  {
    describtion: '서버와의 연결이 끊어졌습니다.',
    error: E.NetworkError,
    code: 0,
    toast: (error: E.ErrorWithToast) => '서버와의 연결이 끊어졌습니다.',
  },
  {
    describtion: '알 수 없는 오류가 발생했습니다.',
    error: E.ErrorWithToast,
    code: 500,
    toast: (error: E.ErrorWithToast) => '알 수 없는 오류가 발생했습니다.',
  },
] as const;

const ErrorConfigs = {} as Record<string, ErrorConfigType>;
ErrorConfigArray.forEach((config) => {
  ErrorConfigs[config.error.name] = config;
});

export default ErrorConfigs;
