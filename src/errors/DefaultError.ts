export default class DefaultError extends Error {
  public statusCode: number;
  private err: any;
  constructor(message = 'Internal server error', statusCode = 500) {
    super();
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
