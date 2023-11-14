import HttpsStatusCode from '../utils/HttpsStatusCode';
import DefaultError from './DefaultError';

export default class InternalServerError extends DefaultError {
  protected statusCode: number = HttpsStatusCode.INTERNAL_SERVER_ERROR;
  constructor(public readonly message: string = 'Internal server errror') {
    super(message);
  }
}
