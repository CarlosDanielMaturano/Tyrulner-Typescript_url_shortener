export default class DefaultError extends Error {
  public readonly statusCode: number;
  public readonly message: string;
  private err: any;
  constructor(
    message: string = 'Internal server error',
    statusCode: number = 500,
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
  static getErrorMessages(err: any): string {
    const errorMessages = Object.values(err.errors)
      .map((error: any) => error.message)
      .join('; ')
      .replaceAll('"', '*');

    return errorMessages;
  }
}
