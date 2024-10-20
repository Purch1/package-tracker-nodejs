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

  static async findById(id) {
    return Delivery.findById(id);
  }

  static async findOne(filter) {
    return Delivery.findOne(filter);
  }

  static async updateById(id, entity) {
    try {
      return Delivery.findByIdAndUpdate(id, entity, { new: true });
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

  static async deleteById(id) {
    return Delivery.findByIdAndDelete(id);
  }
}
