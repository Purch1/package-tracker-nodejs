import { PackageService } from '../../logic/services/package.service.js';
import { BaseHttpResponse } from '../../utils/base-http-response.utils.js';

export class PackageController {
  static async getAllPackages(req, res) {
    const { message, data } = await PackageService.getAllPackages();
    res.status(200).json(BaseHttpResponse.success(message, data));
  }

  static async getPackageById(req, res) {
    const { id } = req.params;
    const { message, data } = await PackageService.getPackageById(id);
    res.status(200).json(BaseHttpResponse.success(message, data));
  }

  static async createPackage(req, res) {
    const { message, data } = await PackageService.create(req.body);
    res.status(201).json(BaseHttpResponse.success(message, data));
  }

  static async updatePackage(req, res) {
    const { id } = req.params;
    const { message, data } = await PackageService.updatePackage(id, req.body);
    res.status(200).json(BaseHttpResponse.success(message, data));
  }

  static async deletePackage(req, res) {
    const { id } = req.params;
    const { message } = await PackageService.deletePackage(id);
    res.status(200).json(BaseHttpResponse.success(message));
  }

  static async updatePackageStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const { message, data } = await PackageService.updatePackageStatus(id, status);
    res.status(200).json(BaseHttpResponse.success(message, data));
  }
}
