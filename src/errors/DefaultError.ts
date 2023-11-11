export default class DefaultError extends Error {
  public readonly statusCode: number;
  public readonly message: string;
  constructor(
    message: string = 'Internal server error',
    statusCode: number = 500,
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}
