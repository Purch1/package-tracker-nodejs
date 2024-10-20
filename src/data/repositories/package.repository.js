import { Package } from '../models/package.model.js';
import BaseRepository from './base.repository.js';

export class PackageRepository extends BaseRepository {
  static async all(filters = {}) {
    return Package.find(filters).sort({ createdAt: -1 });
  }

  static async insert(entity, session) {
    try {
      const newPackage = new Package(entity);
      await newPackage.save({ session });

      return newPackage;
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async findById(id) {
    return Package.findById(id);
  }

  static async findOne(filter) {
    return Package.findOne(filter);
  }

  static async updateById(id, entity) {
    try {
      return Package.findByIdAndUpdate(id, entity, { new: true });
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async upsert(filter, entity, session) {
    try {
      return Package.findOneAndUpdate(filter, entity._doc, {
        upsert: true,
        new: true,
        session
      });
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async deleteById(id) {
    return Package.findByIdAndDelete(id);
  }
}
