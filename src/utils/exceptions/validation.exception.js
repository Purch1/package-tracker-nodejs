import { ApiException } from "./api.exception.js";

/**
 * ValidationException class
 * 
 * @param {{ path: string, message: string }} error - Error details
 */
export class ValidationException extends ApiException {
  constructor(error) {
    super(400, error.message);
  }
}

