export class CreatePackageDto {
  constructor({
    package_id,
    active_delivery_id,
    description,
    weight,
    width,
    height,
    depth,
    from_name,
    from_address,
    from_location,
    to_name,
    to_address,
    to_location
  }) {
    this.package_id = package_id; 
    this.active_delivery_id = active_delivery_id;
    this.description = description;
    this.weight = weight;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.from_name = from_name;
    this.from_address = from_address;
    this.from_location = from_location;
    this.to_name = to_name;
    this.to_address = to_address;
    this.to_location = to_location;
  }

  static from(data) {
    return new CreatePackageDto({
      package_id: data.package_id, 
      active_delivery_id: data.active_delivery_id,
      description: data.description,
      weight: data.weight,
      width: data.width,
      height: data.height,
      depth: data.depth,
      from_name: data.from_name,
      from_address: data.from_address,
      from_location: data.from_location,
      to_name: data.to_name,
      to_address: data.to_address,
      to_location: data.to_location,
    });
  }
}
