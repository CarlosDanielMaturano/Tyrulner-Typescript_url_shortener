import HttpsStatusCode from '../utils/HttpsStatusCode';
import DefaultError from './DefaultError';

export default class BadRequestError extends DefaultError {
  protected statusCode: number = HttpsStatusCode.BAD_REQUEST;
  constructor(public readonly message: string = 'Bad Request Error') {
    super(message);
  }
}
