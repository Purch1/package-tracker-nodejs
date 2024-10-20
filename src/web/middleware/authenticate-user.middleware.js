import { SessionRepository } from '../../data/repositories/session.repository.js';
import { UserRepository } from '../../data/repositories/user.repository.js';
import { JwtService } from '../../utils/jwt.service.js';
import { UnauthorizedException } from '../../utils/exceptions/unauthorized.exception.js';

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new UnauthorizedException({ message: 'No Token Provided' });
  }
  const [scheme, extractedToken] = authHeader.split(' ');

  if (scheme.toLowerCase() !== 'bearer') throw new UnauthorizedException({ message: 'Invalid Token Provided' });

  if (!extractedToken) throw new UnauthorizedException({ message: 'No Token Provided' });

  const decoded = JwtService.decodeToken(extractedToken);
  if (!decoded) throw new UnauthorizedException({ message: 'Invalid or expired token.' });

  // TODO: Move this to redis
  const [session, user] = await Promise.all([
    SessionRepository.findByUserId(decoded.id),
    UserRepository.findById(decoded.id)
  ]);

  if (!session) throw new UnauthorizedException({ message: 'Session Timeout.' });
  if (!user) throw new UnauthorizedException({ message: 'User not found' });

  req.user = user;

  return next();
}
