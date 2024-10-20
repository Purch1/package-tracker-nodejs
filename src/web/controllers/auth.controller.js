import { AuthService } from '../../logic/services/auth.service.js';
import { BaseHttpResponse } from '../../utils/base-http-response.utils.js';

export class AuthController {
  static signup = async (req, res) => {
    const { message, data } = await AuthService.register(req.body);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  static login = async (req, res) => {
    const { message, data } = await AuthService.login(req.body);

    const response = BaseHttpResponse.success(message, data);
    res.status(200).json(response);
  };

}
