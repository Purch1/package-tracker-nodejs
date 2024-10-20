import { ForbiddenException } from '../../utils/exceptions/forbidden.exception.js';
import { messages } from '../../utils/messages.utils.js';

export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role))
      throw new ForbiddenException({ message: messages.exceptions.unauthorizedAccess });

    return next();
  };
}
