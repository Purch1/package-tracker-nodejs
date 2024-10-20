
export class LoginRequestDto {
  constructor({ username, password }) {
    this.username = username;
    this.password = password;
  }

  static from(data) {
    return new LoginRequestDto({
      username: data.username,
      password: data.password,
    });
  }
}
