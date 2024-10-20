import { User } from '../models/user.model.js';
import BaseRepository from './base.repository.js';

export class UserRepository extends BaseRepository {
  static async find(filters = {}) {
    return User.find(filters).sort({ createdAt: -1 });
  }

  static async insert(entity, session) {
    try {
      const user = new User(entity);
      await user.save({ session });

      return user;
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async findById(id) {
    return User.findById(id);
  }

  static async findOne(filter) {
    return User.findOne(filter);
  }

  static async findEmail(email) {
    return User.findOne({ email });
  }

  static async updateById(id, entity) {
    try {
      return User.findByIdAndUpdate(id, entity, { new: true });
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async upsert(filter, entity, session) {
    try {
      return User.findOneAndUpdate(filter, entity._doc, {
        upsert: true,
        new: true,
        session,
      });
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async deleteById(id) {
    return User.findByIdAndDelete(id);
  }
}
