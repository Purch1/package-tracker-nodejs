import { Router } from 'express';
import { ValidateRequest } from '../middleware/validate-request.middleware.js';
import {
  createPackageValidator,
  updatePackageValidator,
  updateStatusValidator
} from '../validators/package.validator.js';
import { PackageController } from '../controllers/package.controller.js';
import { CreatePackageDto, UpdatePackageDto } from '../../logic/dto/package/index.js';
import { idValidator } from '../validators/lib/common-validators.js';

const packageRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Packages
 *   description: Package management endpoints
 */

/**
 * @swagger
 * /packages:
 *   get:
 *     summary: Get all packages
 *     tags: [Packages]
 *     responses:
 *       200:
 *         description: List of packages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Package'
 */
packageRouter.get('/', PackageController.getAllPackages);

/**
 * @swagger
 * /packages/{id}:
 *   get:
 *     summary: Get a package by ID
 *     tags: [Packages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Package ID
 *     responses:
 *       200:
 *         description: Package details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Package'
 */
packageRouter.get('/:id', ValidateRequest.with(idValidator), PackageController.getPackageById);

/**
 * @swagger
 * /packages:
 *   post:
 *     summary: Create a new package
 *     tags: [Packages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePackageDto'
 *     responses:
 *       201:
 *         description: Package created successfully
 *       400:
 *         description: Bad request
 */
packageRouter.post(
  '/',
  ValidateRequest.with(createPackageValidator, CreatePackageDto),
  PackageController.createPackage
);

/**
 * @swagger
 * /packages/{id}:
 *   put:
 *     summary: Update an existing package by ID
 *     tags: [Packages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Package ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePackageDto'
 *     responses:
 *       200:
 *         description: Package updated successfully
 *       400:
 *         description: Bad request
 */
packageRouter.put(
  '/:id',
  ValidateRequest.with(updatePackageValidator, UpdatePackageDto),
  PackageController.updatePackage
);

/**
 * @swagger
 * /packages/{id}/status:
 *   patch:
 *     summary: Update the status of a package by ID
 *     tags: [Packages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Package ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateStatusDto'
 *     responses:
 *       200:
 *         description: Package status updated successfully
 *       400:
 *         description: Bad request
 */
packageRouter.patch('/:id/status', ValidateRequest.with(updateStatusValidator), PackageController.updatePackageStatus);

/**
 * @swagger
 * /packages/{id}:
 *   delete:
 *     summary: Delete a package by ID
 *     tags: [Packages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Package ID
 *     responses:
 *       200:
 *         description: Package deleted successfully
 */
packageRouter.delete('/:id', PackageController.deletePackage);

export default packageRouter;
