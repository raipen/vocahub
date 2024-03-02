export class ErrorWithToast extends Error {
  name: string = 'UnknownError';
  constructor(message: string) {
    super(message);
  }
}

const generateGenericError = (name: string) => {
  return class extends ErrorWithToast {
    static name = name;
    name: string = name;
    constructor(message: string) {
      super(message);
    }
  };
};

export class NotFoundError extends ErrorWithToast {
  missing: string;
  constructor(message: string, missing: string = '{missing}') {
    super(message);
    this.name = 'NotFoundError';
    this.missing = missing;
  }
}

export class NotCorrectTypeError extends ErrorWithToast {
  unCorrect: string;
  constructor(message: string, unCorrect: string = '{unCorrect}') {
    super(message);
    this.name = 'NotCorrectTypeError';
    this.unCorrect = unCorrect;
  }
}
export class ExistError extends ErrorWithToast {
  exist: string;
  constructor(message: string, exist: string = '{exist}') {
    super(message);
    this.name = 'ExistError';
    this.exist = exist;
  }
}

export const AlreadyPaidError = generateGenericError('alreadyPaidError');

export const NotEnoughError = generateGenericError('NotEnoughError');

export const UncorrectTokenError = generateGenericError('UncorrectTokenError');

export const  NotDefinedOnConfigError = generateGenericError("NotDefinedOnConfigError");

export const ValidationError = generateGenericError('ValidationError');

export const UserAuthorizationError = generateGenericError(
  'UserAuthorizationError'
);

export const StoreAuthorizationError = generateGenericError(
  'StoreAuthorizationError'
);

export const NoAuthorizationInHeaderError = generateGenericError(
  'NoAuthorizationInHeaderError'
);

export const NetworkError = generateGenericError('NetworkError');

export const ExpiredAccessTokenError = generateGenericError('ExpiredAccessTokenError');
