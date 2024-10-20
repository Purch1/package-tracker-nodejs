export class CreateUserRequestDto {
  constructor({ firstName, lastName, role, email, password }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.email = email;
    this.password = password;
  }

  static from(data) {
    return new CreateUserRequestDto({
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      email: data.email,
      password: data.password
    });
  }
}
