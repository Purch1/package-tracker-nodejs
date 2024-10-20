import { ApiException } from "./api.exception.js";

/**
 * NotFoundException class
 * 
 * @param {string|Object} error - The error message or an object containing error details
 * @param {string} [error.message] - The error message
 * @param {string} [error.path] - Optional path for additional context
 */
export class NotFoundException extends ApiException {
  constructor(error) {
    const err = typeof error === 'string' ? { message: error } : error;
    super(404, err.message);
  }
}

