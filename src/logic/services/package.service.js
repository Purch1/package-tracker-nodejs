import { DeliveryRepository } from '../../data/repositories/delivery.repository.js';
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

  static async getAllPackages() {
    const packages = await PackageRepository.all();

    return {
      message: 'Packages retrieved successfully',
      data: PackageResponseDto.fromMany(packages)
    };
  }

  static async getPackageById(packageId) {
    const packageEntity = await PackageRepository.findByPackageId(packageId);

    if (!packageEntity) {
      throw new NotFoundException('Package not found');
    }

    const activeDeliveryId = packageEntity.active_delivery_id;

    // Fetch the delivery details manually using the active_delivery_id
    const activeDelivery = await DeliveryRepository.findOne({ delivery_id: activeDeliveryId });

    if (!activeDelivery) {
      return {
        message: 'No active delivery found with the given ID',
        data: PackageResponseDto.from(packageEntity)
      };
    }

    // Prepare delivery details without package_id
    const deliveryDetails = {
      pickup_time: activeDelivery.pickup_time,
      start_time: activeDelivery.start_time,
      end_time: activeDelivery.end_time,
      location: activeDelivery.location,
      status: activeDelivery.status
    };

    return {
      message: 'Package and delivery details retrieved successfully',
      data: {
        package: PackageResponseDto.from(packageEntity),
        delivery: deliveryDetails
      }
    };
  }

  static async updatePackageStatus(packageId, status) {
    const updatedPackage = await PackageRepository.updateByPackageId(packageId, { status });

    if (!updatedPackage) {
      throw new NotFoundException('Package not found');
    }

    return {
      message: `Package status updated to ${status}`,
      data: PackageResponseDto.from(updatedPackage)
    };
  }

  static async updatePackage(packageId, packageDetails) {
    const updatedPackage = await PackageRepository.updatePackage(packageId, packageDetails);

    if (!updatedPackage) {
      throw new NotFoundException('Package not found');
    }

    return {
      message: 'Package updated successfully',
      data: PackageResponseDto.from(updatedPackage)
    };
  }

  static async deletePackage(packageId) {
    const deletedPackage = await PackageRepository.deletePackageId(packageId);

    if (!deletedPackage) {
      throw new NotFoundException('Package not found');
    }

    return {
      message: 'Package deleted successfully'
    };
  }
}
