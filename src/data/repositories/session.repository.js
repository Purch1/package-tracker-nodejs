/* eslint-disable consistent-return */
import { Session } from '../models/session.model.js';
import BaseRepository from './base.repository.js';

export class SessionRepository extends BaseRepository {
  static async find(filter = {}, sortOrder = { createdAt: -1 }) {
    return Session.find(filter).sort(sortOrder);
  }

  static async insert(entity, session) {
    try {
      const newSession = new Session(entity);
      await newSession.save({ session });

      return newSession;
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async findById(id) {
    return Session.findById(id);
  }

  static async findOne(filter) {
    return Session.findOne(filter);
  }

  static async findByToken(token) {
    return Session.findOne({ token });
  }

  static async findByUserId(userId) {
    return Session.findOne({ userId });
  }

  static async updateById(id, sessionEntity) {
    try {
      return Session.findByIdAndUpdate(id, sessionEntity, { new: true });
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async upsert(sessionEntity) {
    try {
      return Session.findOneAndUpdate({ userId: sessionEntity.userId }, sessionEntity, {
        new: true,
        upsert: true,
      });
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async deleteById(id) {
    return Session.findByIdAndDelete(id);
  }

  static async deleteByUserId(userId) {
    return Session.findOneAndDelete({ userId });
  }

  static async deleteByToken(token) {
    return Session.findOneAndDelete({ token });
  }
}
