export class ErrorCode extends Error {
  code: string;

  constructor(params: { message: string; code: string }) {
    super(params.message);
    this.name = 'ErrorCode:';
    this.code = params.code;
  }
}
