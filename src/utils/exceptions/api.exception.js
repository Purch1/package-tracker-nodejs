
export class ApiException extends Error {
  constructor(httpStatusCode, errors) {
    super(); 
    
    Object.setPrototypeOf(this, new.target.prototype);

    this.status = httpStatusCode;
    this.errors = errors;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
