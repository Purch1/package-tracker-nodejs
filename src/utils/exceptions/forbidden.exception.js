import { ApiException } from "./api.exception.js";

/**
 * ForbiddenException class
 * 
 * @param {Object} error - The forbidden error object
 * @param {string} error.message - The forbidden error message
 */
export class ForbiddenException extends ApiException {
  constructor(error) {
    super(403, error.message);
  }
}

