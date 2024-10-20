import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { ValidateRequest } from '../middleware/validate-request.middleware.js';
import { loginRequestValidator, signupRequestValidator } from '../validators/auth.validator.js';
import { CreateUserRequestDto } from '../../logic/dto/Auth/create-user-request.dto.js';
import { LoginRequestDto } from '../../logic/dto/Auth/login-user-request.dto.js';

const authRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication related endpoints
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequestDto'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       409:
 *         description: Conflict - User already exists
 */
authRouter.post(
  '/register',
  ValidateRequest.with(signupRequestValidator, CreateUserRequestDto),
  AuthController.signup
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequestDto'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Bad request
 */
authRouter.post(
  '/login',
  ValidateRequest.with(loginRequestValidator, LoginRequestDto),
  AuthController.login
);

export default authRouter;
