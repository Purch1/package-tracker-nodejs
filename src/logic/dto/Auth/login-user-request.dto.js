
export class LoginRequestDto {
  constructor({ email, password }) {
    this.email = email;
    this.password = password;
  }

  static from(data) {
    return new LoginRequestDto({
      email: data.email,
      password: data.password,
    });
  }
}
