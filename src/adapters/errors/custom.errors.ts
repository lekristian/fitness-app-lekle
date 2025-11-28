class CustomAPIError extends Error {
  message: string;
  errorCode: ErrorCode;
  statusCode: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(
    message: string,
    errorCode: ErrorCode,
    statusCode: number,
    error: any
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.error = error;
  }
}
export enum ErrorCode {
  NOT_FOUND = 1001,
  ALREADY_EXST = 1002,
  FORBIDDEN = 1003,
  INTERNAL_SERVER = 1005,
  TOO_MANY_REQUEST = 1006,
  BAD_REQUEST = 1007,
  UNAUTHENTICATED_USER = 1008,
  TOKEN_NOT_FOUND = 1009,
  TOKEN_EXPIRE = 1010,
  TOKEN_BLACKLISTED = 1011,
}
export default CustomAPIError;
