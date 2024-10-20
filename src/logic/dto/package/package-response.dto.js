// dtos/PackageDto.js

export class PackageResponseDto {
  constructor({
    id,
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
    to_location,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
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
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from({
    _id,
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
    to_location,
    createdAt,
    updatedAt,
  }) {
    return new PackageResponseDto({
      id: _id,
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
      to_location,
      createdAt,
      updatedAt,
    });
  }

  /**
   * @param {Array} packages
   */
  static fromMany(packages) {
    return packages.map((pkg) => PackageDto.from(pkg));
  }
}
