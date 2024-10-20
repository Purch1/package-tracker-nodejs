export class UserResponseDto {
  constructor({ firstName, lastName, role, email, createdAt, updatedAt }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from({ firstName, lastName, role, email, createdAt, updatedAt }) {
    return new UserResponseDto({
      firstName,
      lastName,
      role,
      email,
      createdAt,
      updatedAt,
    });
  }

  /**
   * @param {Array} users
   */
  static fromMany(users) {
    return users.map((user) => UserDto.from(user));
  }
}
