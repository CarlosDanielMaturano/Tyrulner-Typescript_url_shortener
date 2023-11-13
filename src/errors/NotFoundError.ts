import HttpsStatusCode from '../utils/HttpsStatusCode';
import DefaultError from './DefaultError';

export default class NotFoundError extends DefaultError {
  protected statusCode: number = HttpsStatusCode.NOT_FOUND;
  constructor(public readonly message: string = 'Not found error') {
    super(message);
    this.message = message;
  }
}
