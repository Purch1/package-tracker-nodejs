import bcrypt from 'bcryptjs';

export class Encryption {
  /**
   * Encrypts the given text with an optional salt.
   *
   * @param {string} text - The text to be encrypted.
   * @param {(string|number)} [salt=12] - Optional salt for encryption. Defaults to 12 if not provided.
   * @returns {string} - The encrypted hash.
   * @throws {Error} - If missing arguments or invalid argument types.
   */
  static encryptText(text, salt = 12) {
    if (!text) {
      throw new Error('Missing one or more required arguments');
    } else if (typeof text !== 'string') {
      throw new Error(`Expected text: string received type ${typeof text}`);
    } else if (!['string', 'number'].includes(typeof salt)) {
      throw new Error(`Expected salt: string | number received type ${typeof text}`);
    }

    return bcrypt.hashSync(text, salt);
  }

  /**
   * Checks if the given text is encrypted.
   *
   * @param {string} text - The text to check for encryption.
   * @returns {boolean} - True if the text is encrypted, false otherwise.
   * @throws {Error} - If missing arguments or invalid argument types.
   */
  static isEncrypted(text) {
    if (!text) {
      throw new Error('Missing one or more required arguments');
    } else if (typeof text !== 'string') {
      throw new Error(`Expected text: string received type ${typeof text}`);
    }

    return bcrypt.getRounds(text) > 0;
  }

  /**
   * Compares a plaintext text with a hash to check for a match.
   *
   * @param {string} hash - The hash to compare against.
   * @param {string} text - The plaintext text to compare.
   * @returns {boolean} - True if the text matches the hash, false otherwise.
   * @throws {Error} - If missing arguments or invalid argument types.
   */
  static compare(hash, text) {
    if (!hash || !text) {
      throw new Error('Missing one or more required arguments');
    } else if (typeof text !== 'string' || typeof hash !== 'string') {
      throw new Error(`Expected "string" received ${typeof text}`);
    }

    return bcrypt.compareSync(text, hash);
  }
}
