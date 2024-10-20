import { DeliveryRepository } from '../../data/repositories/delivery.repository.js';
import { NotFoundException } from '../../utils/exceptions/index.js';
import { deliveryEvents } from '../../web/websockets/events/delivery-events.js';
import { DeliveryResponseDto } from '../dto/delivery/delivery-response.dto.js';

export class DeliveryService {
  static async getAllDeliveries() {
    const deliveries = await DeliveryRepository.find();
    return {
      message: 'Deliveries retrieved successfully',
      data: deliveries.map((delivery) => DeliveryResponseDto.from(delivery))
    };
  }

  static async getDeliveryById(deliveryId) {
    const delivery = await DeliveryRepository.findById(deliveryId);

    if (!delivery) {
      throw new NotFoundException('Delivery not found');
    }

    return {
      message: 'Delivery retrieved successfully',
      data: DeliveryResponseDto.from(delivery)
    };
  }

  static async createDelivery(data) {
    const delivery = await DeliveryRepository.insert(data);

    if (!delivery) {
      throw new NotFoundException('Failed to create delivery');
    }

    return {
      message: 'Delivery created successfully',
      data: DeliveryResponseDto.from(delivery)
    };
  }

  static async updateDelivery(deliveryId, data) {
    const updatedDelivery = await DeliveryRepository.updateById(deliveryId, data);

    if (!updatedDelivery) {
      throw new NotFoundException('Delivery not found');
    }

    return {
      message: 'Delivery updated successfully',
      data: DeliveryResponseDto.from(updatedDelivery)
    };
  }

  static async updateDeliveryStatus(deliveryId, status) {
    const delivery = await DeliveryRepository.findById(deliveryId);

    if (!delivery) {
      throw new NotFoundException('Delivery not found');
    }

    // Set appropriate timestamps
    if (status === 'picked-up') {
      delivery.pickup_time = new Date();
    } else if (status === 'in-transit') {
      delivery.start_time = new Date();
    } else if (status === 'delivered' || status === 'failed') {
      delivery.end_time = new Date();
    }

    delivery.status = status;
    await delivery.save();

    // Emit delivery updated event
    deliveryEvents.deliveryUpdated(delivery);

    return {
      message: `Delivery status updated to ${status}`,
      data: DeliveryResponseDto.from(delivery)
    };
  }

  static async updateDeliveryLocation(deliveryId, location) {
    const delivery = await DeliveryRepository.findById(deliveryId);

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
    const deletedDelivery = await DeliveryRepository.deleteById(deliveryId);

    if (!deletedDelivery) {
      throw new NotFoundException('Delivery not found');
    }

    return {
      message: 'Delivery deleted successfully'
    };
  }
}
