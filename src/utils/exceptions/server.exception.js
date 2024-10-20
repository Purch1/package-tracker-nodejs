import { ApiException } from "./api.exception.js";

export class ServerException extends ApiException {
  /**
   * ServerException class
   *
   * @param {{ message: string, [key: string]: any }} errors - Error details
   * @param {Error} [innerException] - Optional inner exception for additional context
   */
  constructor(errors, innerException) {
    super(500, errors.message);
    this.innerException = innerException;
  }
}
