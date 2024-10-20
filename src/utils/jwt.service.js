/* eslint-disable no-param-reassign */
import jwt from 'jsonwebtoken';

import config from '../config/app.config.js';
import logger from './logger.utils.js';

export class JwtService {
  static TokenError = jwt.JsonWebTokenError;

  /**
   *
   * @param {Object} payload
   * @param {jwt.SignOptions} [options]
   * @returns {string}
   */
  static generateAccessToken(payload, options = {}) {
    options.issuer = config.jwt.issuer;
    options.expiresIn ??= Number(config.jwt.ttl.accessInSec);

    return jwt.sign(payload, config.jwt.secret, options);
  }

  /**
   *
   * @param {Object} payload
   * @param {jwt.SignOptions} [options]
   * @returns {string}
   */
  static generateRefreshToken(payload, options = {}) {
    options.issuer = config.jwt.issuer;
    options.expiresIn ??= Number(config.jwt.ttl.refreshInSec);

    return jwt.sign(payload, config.jwt.secret, options);
  }

  static decodeToken(token) {
    try {
      return jwt.verify(token, config.jwt.secret, { issuer: config.jwt.issuer });
    } catch (error) {
      logger.debug(`JWT verification failed: ${error.message}`);

      return null;
    }
  }
}
