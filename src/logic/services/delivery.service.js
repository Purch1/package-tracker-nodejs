import { startSession } from 'mongoose';
import { DeliveryRepository } from '../../data/repositories/delivery.repository.js';
import { PackageRepository } from '../../data/repositories/package.repository.js';
import { NotFoundException } from '../../utils/exceptions/index.js';
import { deliveryEvents } from '../../web/websockets/events/delivery-events.js';
import { DeliveryResponseDto } from '../dto/delivery/delivery-response.dto.js';
import { DeliveryStatus } from '../../utils/helpers/deliveries.helpers.js';
import { PackageDetailsResponseDto } from '../dto/package/package-details-response.dto.js';

export class DeliveryService {
  static async getAllDeliveries() {
    const deliveries = await DeliveryRepository.find();
    return {
      message: 'Deliveries retrieved successfully',
      data: DeliveryResponseDto.fromMany(deliveries)
    };
  }

  static async getDeliveryById(deliveryId) {
    const delivery = await DeliveryRepository.findByDeliveryId(deliveryId);

    if (!delivery) {
      throw new NotFoundException('Delivery not found');
    }

    const packageDetails = await PackageRepository.findByPackageId(delivery.package_id);
    return {
      message: 'Delivery retrieved successfully',

      data: {
        delivery: DeliveryResponseDto.from(delivery),
        package: PackageDetailsResponseDto.from(packageDetails)
      }
    };
  }

  static async createDelivery(data) {
    const delivery = await DeliveryRepository.insert(data);

    if (!delivery) {
      throw new NotFoundException('Failed to create delivery');
    }

    // Update the corresponding package with the active delivery ID
    const packageId = delivery.package_id;
    await PackageRepository.updateByPackage(packageId, {
      active_delivery_id: delivery.delivery_id
    });

    return {
      message: 'Delivery created successfully',
      data: DeliveryResponseDto.from(delivery)
    };
  }

  static async updateDelivery(deliveryId, data) {
    const updatedDelivery = await DeliveryRepository.updateByDeliveryId(deliveryId, data);

    if (!updatedDelivery) {
      throw new NotFoundException('Delivery not found');
    }

    return {
      message: 'Delivery updated successfully',
      data: DeliveryResponseDto.from(updatedDelivery)
    };
  }

  static async updateDeliveryStatus(deliveryId, status) {
    const delivery = await DeliveryRepository.findByDeliveryId(deliveryId);

    if (!delivery) {
      throw new NotFoundException('Delivery not found');
    }

    // Update timestamps
    this.#updateTimestamps(delivery, status);

    // Update delivery status
    delivery.status = status;
    await delivery.save();

    // Emit delivery updated event
    deliveryEvents.deliveryUpdated(delivery);

    // Update active_delivery_id if the delivery is active
    await this.#updateActiveDeliveryId(delivery, status);

    return {
      message: `Delivery status updated to ${status}`,
      data: DeliveryResponseDto.from(delivery)
    };
  }

  static async updateDeliveryLocation(deliveryId, location) {
    const delivery = await DeliveryRepository.findByDeliveryId(deliveryId);

    if (!delivery) {
      throw new NotFoundException('Delivery not found');
    }

    delivery.current_location = location;
    await delivery.save();

    // Emit delivery updated event
    deliveryEvents.deliveryUpdated(delivery);

    return {
      message: 'Delivery location updated',
      data: DeliveryResponseDto.from(delivery)
    };
  }

  static async deleteDelivery(deliveryId) {
    const deletedDelivery = await DeliveryRepository.deleteByDeliveryId(deliveryId);

    if (!deletedDelivery) {
      throw new NotFoundException('Delivery not found');
    }

    return {
      message: 'Delivery deleted successfully'
    };
  }

  static #updateTimestamps(delivery, status) {
    if (status === DeliveryStatus.PICKED_UP) {
      delivery.pickup_time = new Date();
    } else if (status === DeliveryStatus.IN_TRANSIT) {
      delivery.start_time = new Date();
    } else if ([DeliveryStatus.DELIVERED, DeliveryStatus.FAILED].includes(status)) {
      delivery.end_time = new Date();
    }
  }

  static async #updateActiveDeliveryId(delivery, status) {
    const activeStatuses = [DeliveryStatus.OPEN, DeliveryStatus.PICKED_UP, DeliveryStatus.IN_TRANSIT];

    if (activeStatuses.includes(status)) {
      const packageId = delivery.package_id;
      await PackageRepository.updatePackage(packageId, {
        active_delivery_id: delivery.delivery_id
      });
    } else {
      const packageId = delivery.package_id;
      await PackageRepository.updatePackage(packageId, {
        active_delivery_id: null
      });
    }
  }
}
