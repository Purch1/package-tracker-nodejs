import { BaseHttpResponse } from "../../utils/base-http-response.utils.js";
import { ApiException, ConflictException, ServerException } from "../../utils/exceptions/index.js";
import logger from "../../utils/logger.utils.js";

/**
 * Error handling middleware for handling various types of errors in an Express application.
 *
 * @param {Error | ApiException | ServerException} error - The error object, which can be a standard error, ApiException, or ServerException.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 * @returns {Response | void}
 */
export function errorHandlingMiddleware(error, req, res, next) {
  // Handle JSON syntax errors
  if (error instanceof SyntaxError && 'body' in error) {
    const response = BaseHttpResponse.failed(`Error parsing JSON: ${error.message}`, error);
    return res.status(400).json(response);
  }

  if (error instanceof ServerException) {
    console.error(error);
    if (error.innerException) {
      logger.error(error.innerException.message, error.innerException.stack);
    }
    const response = BaseHttpResponse.failed(error.message, error.errors);
    return res.status(error.status).json(response);
  }

  if (error instanceof ApiException) {
    console.log(error.errors)
    const response = BaseHttpResponse.failed(error.message, error.errors);
    return res.status(error.status).json(response);
  }

  if (error instanceof Error) {
    logger.error(error.message, error.stack);
    console.error(error);
    const response = BaseHttpResponse.failed('Something went wrong');
    return res.status(500).json(response);
  }

  return next();
}

