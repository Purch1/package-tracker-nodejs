
import { Router } from 'express';
import { ValidateRequest } from '../middleware/validate-request.middleware.js';
import { createDeliveryValidator, updateDeliveryStatusValidator, updateDeliveryValidator } from '../validators/delivery.validator.js';
import { DeliveryController } from '../controllers/delivery.controller.js';
import { CreateDeliveryDto } from '../../logic/dto/delivery/create-delivery-request.dto.js';
import { UpdateDeliveryDto } from '../../logic/dto/delivery/update-delivery-request.dto.js';
import { idValidator } from '../validators/lib/common-validators.js';

const deliveryRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Deliveries
 *   description: Delivery management endpoints
 */

/**
 * @swagger
 * /deliveries:
 *   get:
 *     summary: Get all deliveries
 *     tags: [Deliveries]
 *     responses:
 *       200:
 *         description: List of deliveries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Delivery'
 */
deliveryRouter.get('/', DeliveryController.getAllDeliveries);

/**
 * @swagger
 * /deliveries/{id}:
 *   get:
 *     summary: Get a delivery by ID
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Delivery ID
 *     responses:
 *       200:
 *         description: Delivery details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Delivery'
 */
deliveryRouter.get('/:id', ValidateRequest.with(idValidator), DeliveryController.getDeliveryById);

/**
 * @swagger
 * /deliveries:
 *   post:
 *     summary: Create a new delivery
 *     tags: [Deliveries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDeliveryDto'
 *     responses:
 *       201:
 *         description: Delivery created successfully
 *       400:
 *         description: Bad request
 */
deliveryRouter.post(
  '/',
  ValidateRequest.with(createDeliveryValidator, CreateDeliveryDto),
  DeliveryController.createDelivery
);

/**
 * @swagger
 * /deliveries/{id}:
 *   put:
 *     summary: Update an existing delivery by ID
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Delivery ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDeliveryDto'
 *     responses:
 *       200:
 *         description: Delivery updated successfully
 *       400:
 *         description: Bad request
 */
deliveryRouter.put(
  '/:id',
  ValidateRequest.with(updateDeliveryValidator, UpdateDeliveryDto),
  DeliveryController.updateDelivery
);

/**
 * @swagger
 * /deliveries/status/{id}:
 *   put:
 *     summary: Update delivery status by ID
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Delivery ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDeliveryDto'
 *     responses:
 *       200:
 *         description: Delivery status updated successfully
 *       400:
 *         description: Bad request
 */
deliveryRouter.put(
  '/status/:id',
  ValidateRequest.with(updateDeliveryStatusValidator, UpdateDeliveryDto),
  DeliveryController.updateDeliveryStatus
);

/**
 * @swagger
 * /deliveries/{id}:
 *   delete:
 *     summary: Delete a delivery by ID
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Delivery ID
 *     responses:
 *       200:
 *         description: Delivery deleted successfully
 */
deliveryRouter.delete('/:id', DeliveryController.deleteDelivery);

export default deliveryRouter;
