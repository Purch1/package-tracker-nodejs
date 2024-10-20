import { PackageRepository } from '../../data/repositories/package.repository.js';
import { NotFoundException } from '../../utils/exceptions/index.js';
import { PackageResponseDto } from '../dto/package/package-response.dto.js';

export class PackageService {
  static async create(packageDetails) {
    const newPackage = await PackageRepository.insert(packageDetails);

    if (!newPackage) {
      throw new NotFoundException('Package creation failed');
    }

    return {
      message: 'Package created successfully',
      data: PackageResponseDto.from(newPackage)
    };
  }

  static async updatePackageStatus(packageId, status) {
    const updatedPackage = await PackageRepository.updatePackageStatus(packageId, status);

    if (!updatedPackage) {
      throw new NotFoundException('Package not found');
    }

    return {
      message: `Package status updated to ${status}`,
      data: PackageResponseDto.from(updatedPackage)
    };
  }

  static async updatePackage(packageId, packageDetails) {
    const updatedPackage = await PackageRepository.updateById(packageId, packageDetails);

    if (!updatedPackage) {
      throw new NotFoundException('Package not found');
    }

    return {
      message: 'Package updated successfully',
      data: PackageResponseDto.from(updatedPackage)
    };
  }

  static async getAllPackages() {
    const packages = await PackageRepository.all();

    return {
      message: 'Packages retrieved successfully',
      data: packages.map((pkg) => PackageResponseDto.from(pkg))
    };
  }

  static async getPackageById(packageId) {
    const packageEntity = await PackageRepository.findById(packageId);

    if (!packageEntity) {
      throw new NotFoundException('Package not found');
    }

    return {
      message: 'Package retrieved successfully',
      data: PackageResponseDto.from(packageEntity)
    };
  }

  static async deletePackage(packageId) {
    const deletedPackage = await PackageRepository.deleteById(packageId);

    if (!deletedPackage) {
      throw new NotFoundException('Package not found');
    }

    return {
      message: 'Package deleted successfully'
    };
  }
}
