import { NotFoundException } from '../../utils/exceptions/index.js';

export function handleInvalidRoutes(req, res, next) {
  const error = new NotFoundException({
    message: 'Resource Endpoint Not Found',
    method: req.method,
    path: req.originalUrl,
  });

  next(error);
}
