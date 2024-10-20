export class BaseHttpResponse {
  /**
   *
   * @param {boolean} success
   * @param {string} message
   * @param {*} data
   * @param {*} errors
   */
  constructor(success, message, data, errors) {
    this.success = success;
    this.message = message  === '' ? undefined : message;
    this.data = data;
    this.error = errors;
  }

  /**
   *
   * @param {string} message
   * @param {*} data
   * @returns {BaseHttpResponse}
   */
  static success(message, data) {
    return new BaseHttpResponse(true, message, data, undefined);
  }

  /**
   *
   * @param {string} message
   * @param {*} errors
   * @returns {BaseHttpResponse}
   */
  static failed(message, errors) {
    return new BaseHttpResponse(false, message, undefined, errors);
  }
}
