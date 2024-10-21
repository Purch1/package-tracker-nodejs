import { Delivery } from '../models/delivery.model.js';
import BaseRepository from './base.repository.js';

export class DeliveryRepository extends BaseRepository {
  static async find(filters = {}) {
    return Delivery.find(filters).sort({ createdAt: -1 });
  }

  static async insert(entity, session) {
    try {
      const delivery = new Delivery(entity);
      await delivery.save({ session });

      return delivery;
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async findByDeliveryId(deliveryId) {
    return Delivery.findOne({ delivery_id: deliveryId });
  }

  static async findOne(filter) {
    return Delivery.findOne(filter);
  }

  static async updateByDeliveryId(deliveryId, entity) {
    try {
      return Delivery.findOneAndUpdate({ delivery_id: deliveryId }, entity, { new: true });
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async upsert(filter, entity, session) {
    try {
      return Delivery.findOneAndUpdate(filter, entity._doc, {
        upsert: true,
        new: true,
        session,
      });
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async deleteByDeliveryId(deliveryId) {
    return Delivery.findOneAndDelete({ delivery_id: deliveryId });
  }
}
