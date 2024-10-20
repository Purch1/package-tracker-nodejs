import { ApiException } from "./api.exception.js";

/**
 * ConflictException class to handle 409 Conflict errors.
 */
export class ConflictException extends ApiException {
  constructor(error) {
    super(409, error);
  }
}

