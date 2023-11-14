import { Request, Response } from 'express';

export default abstract class DefaultError extends Error {
  constructor(
    public readonly message: string = 'Internal server error',
    protected statusCode: number = 500,
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
  public sendResponse(req: Request, res: Response): void {
    const statusCode = this.statusCode;
    res.status(statusCode).send({
      statusCode,
      message: this.message,
    });
  }
}
