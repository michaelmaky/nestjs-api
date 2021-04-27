import { createDecipheriv, createCipheriv } from 'crypto';

/**
 * decrypt text
 *
 * @param cipherText text wanted to be decode
 * @param key crypto key
 */
export const decrypt = (cipherText: string, key: string) => {
  // create decipher with key
  const decipher = createDecipheriv(
    'aes256',
    Buffer.from(key, 'base64'),
    Buffer.alloc(16),
  );

  // start decrypt
  let plainText = decipher.update(cipherText, 'hex', 'utf8');
  plainText += decipher.final('utf8');

  return plainText;
};

export const encrypt = (plainText: string, key: string) => {
  // create cipher
  const cipher = createCipheriv(
    'aes256',
    Buffer.from(key, 'base64'),
    Buffer.alloc(16),
  );

  // encrypt text
  let cipherText = cipher.update(plainText, 'utf8', 'hex');
  cipherText += cipher.final('hex');

  return cipherText;
};
