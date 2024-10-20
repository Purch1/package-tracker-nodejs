import { ApiException } from "./api.exception.js";
/**
 *
 * @param {number} statusCode
 * @param {string} message
 */
export class UnauthorizedException extends ApiException {
  constructor(error) {
    super(401, error.message);
  }
}
