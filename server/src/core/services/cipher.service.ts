import crypto from 'node:crypto';
import { env } from '../../config/envVars.js';

export default class Cipher {
  private static readonly ALGORITHM: crypto.CipherGCMTypes = 'aes-256-gcm';
  private static readonly IV_LENGTH = 12;

  private static getKey(key?: string | Buffer): Buffer {
    const rawKey = key ?? env.CIPHER_SECRET_KEY;

    if (!rawKey) {
      throw new Error('Secret key is required or must be set in process.env.CIPHER_SECRET_KEY.');
    }

    const keyBuffer = typeof rawKey === 'string' ? Buffer.from(rawKey, 'hex') : rawKey;

    if (keyBuffer.length !== 32) {
      throw new Error(`Invalid key length. Expected 32 bytes (64 hex characters), got ${keyBuffer.length} bytes.`);
    }

    return keyBuffer;
  }

  public static encrypt(text: string, key?: string | Buffer): string {
    const keyBuffer = this.getKey(key);
    const iv = crypto.randomBytes(this.IV_LENGTH);

    const cipher = crypto.createCipheriv(this.ALGORITHM, keyBuffer, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag().toString('hex');

    return `${iv.toString('hex')}:${authTag}:${encrypted}`;
  }

  public static decrypt(encryptedData: string, key?: string | Buffer): string {
    const keyBuffer = this.getKey(key);
    const parts = encryptedData.split(':');

    if (parts.length !== 3) {
      throw new Error('Invalid encrypted data format. Expected "iv:authTag:ciphertext".');
    }

    const [ivHex, authTagHex, cipherText] = parts;
    if (!ivHex || !authTagHex || !cipherText) throw new Error("");

    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');

    const decipher = crypto.createDecipheriv(this.ALGORITHM, keyBuffer, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(cipherText!, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}