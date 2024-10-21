import { DeliveryService } from '../../logic/services/delivery.service.js';
import { BaseHttpResponse } from '../../utils/base-http-response.utils.js';

export class DeliveryController {
  static async getAllDeliveries(req, res) {
    const { message, data } = await DeliveryService.getAllDeliveries();
    res.status(200).json(BaseHttpResponse.success(message, data));
  }

  static async getDeliveryById(req, res) {
    const { message, data } = await DeliveryService.getDeliveryById(req.params.id);
    res.status(200).json(BaseHttpResponse.success(message, data));
  }

  static async createDelivery(req, res) {
    const { message, data } = await DeliveryService.createDelivery(req.body);
    res.status(201).json(BaseHttpResponse.success(message, data));
  }

  static async updateDeliveryStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const { message, data } = await DeliveryService.updateDeliveryStatus(id, status);
    res.status(200).json(BaseHttpResponse.success(message, data));
  }

  static async updateDelivery(req, res) {
    const { id } = req.params;
    const { message, data } = await DeliveryService.updateDelivery(id, req.body);
    res.status(200).json(BaseHttpResponse.success(message, data));
  }

  static async deleteDelivery(req, res) {
    const { id } = req.params;
    const { message } = await DeliveryService.deleteDelivery(id);
    res.status(200).json(BaseHttpResponse.success(message));
  }
}
