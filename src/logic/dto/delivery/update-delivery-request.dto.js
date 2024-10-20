export class UpdateDeliveryDto {
    constructor({ delivery_id, package_id, pickup_time, start_time, end_time, location, status }) {
      this.delivery_id = delivery_id;
      this.package_id = package_id;
      this.pickup_time = pickup_time;
      this.start_time = start_time;
      this.end_time = end_time;
      this.location = location;
      this.status = status;
    }
  
    static from(data) {
      return new UpdateDeliveryDto({
        delivery_id: data.delivery_id,
        package_id: data.package_id,
        pickup_time: data.pickup_time,
        start_time: data.start_time,
        end_time: data.end_time,
        location: data.location,
        status: data.status,
      });
    }
  }
  