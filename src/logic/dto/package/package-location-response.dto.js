export class PackageLocationResponseDto {
  constructor({
    package_id,
    from_name,
    from_address,
    from_location,
    to_name,
    to_address,
    to_location,
  }) {
    this.from_name = from_name;
    this.from_address = from_address;
    this.from_location = from_location;
    this.to_name = to_name;
    this.to_address = to_address;
    this.to_location = to_location;
  }

  static from({
    package_id,
    from_name,
    from_address,
    from_location,
    to_name,
    to_address,
    to_location,
  }) {
    return new PackageLocationResponseDto({
      package_id,
      active_delivery_id,
      from_name,
      from_address,
      from_location,
      to_name,
      to_address,
      to_location,
    });
  }

  /**
   * @param {Array} packages
   */
  static fromMany(packages) {
    return packages.map((pkg) => PackageLocationResponseDto.from(pkg));
  }
}
