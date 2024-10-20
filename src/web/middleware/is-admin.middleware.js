import { ForbiddenException } from '../../utils/exceptions/forbidden.exception.js';
import { UserRole } from '../../utils/helpers/user.helpers.js';
import { messages } from '../../utils/index.js';

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export function isAdmin(req, res, next) {
  if (req.user.role !== UserRole.ADMIN)
    throw new ForbiddenException({
      message: messages.exceptions.unauthorizedAccess,
    });

  return next();
}
