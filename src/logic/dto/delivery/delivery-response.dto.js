export class DeliveryResponseDto {
  constructor({
    id,
    delivery_id,
    package_id,
    pickup_time,
    start_time,
    end_time,
    location,
    status,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.delivery_id = delivery_id;
    this.package_id = package_id;
    this.pickup_time = pickup_time;
    this.start_time = start_time;
    this.end_time = end_time;
    this.location = location;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from({
    _id,
    delivery_id,
    package_id,
    pickup_time,
    start_time,
    end_time,
    location,
    status,
    createdAt,
    updatedAt,
  }) {
    return new DeliveryResponseDto({
      id: _id,
      delivery_id,
      package_id,
      pickup_time,
      start_time,
      end_time,
      location,
      status,
      createdAt,
      updatedAt,
    });
  }

  /**
   *
   * @param {Array} deliveries
   */
  static fromMany(deliveries) {
    return deliveries.map((delivery) => DeliveryResponseDto.from(delivery));
  }
}