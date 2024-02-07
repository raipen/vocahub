export class ErrorWithToast extends Error {
    name: string = 'UnknownError';
    toast: string = '알 수 없는 에러가 발생했습니다.';
    constructor(message: string, toast?: string) {
      super(message);
      this.toast = toast || this.toast;
    }
    setToast(toast: string): ErrorWithToast {
      this.toast = toast;
      return this;
    }
}

//만료된 access token 에러
export class ExpiredAccessTokenError extends ErrorWithToast{
    name: string = 'ExpiredAccessTokenError';
    toast: string = '세션이 만료되었습니다. 다시 로그인해주세요.';
    constructor(message: string, toast?: string) {
      super(message, toast);
    }
}