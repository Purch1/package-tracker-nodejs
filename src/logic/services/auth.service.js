import { UserRepository } from '../../data/repositories/user.repository.js';
import { Encryption } from '../../utils/encryption.utils.js';
import { ConflictException, NotFoundException } from '../../utils/exceptions/index.js';
import { UserResponseDto } from '../dto/Auth/user-response.dto.js';
import { JwtService } from '../../utils/jwt.service.js';

export class AuthService {
  static async register(entity) {
    const password = await Encryption.encryptText(entity.password, 12);

    const user = await UserRepository.insert({ ...entity, password });
    if (!user) {
      throw new NotFoundException('Failed to create user');
    }

    return {
      message: 'User created successfully',
      data: UserResponseDto.from(user)
    };
  }

  static async login({ email, password }) {
    const user = await UserRepository.findEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await Encryption.compare(user.password, password);
    if (!isMatch) {
      throw new ConflictException('Invalid credentials');
    }

    return {
      message: 'User logged in successfully',
      data: {
        user: UserResponseDto.from(user),
        accessToken: JwtService.generateAccessToken({ id: user.id })
      }
    };
  }
}
