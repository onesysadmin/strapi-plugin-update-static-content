/**
 * Encrypts a string using AES-256-GCM.
 * Returns a base64 string containing: IV + AuthTag + Ciphertext
 */
export declare function encrypt(plaintext: string, keyBase64: string): string;
/**
 * Decrypts a string that was encrypted with the encrypt function.
 * Expects a base64 string containing: IV + AuthTag + Ciphertext
 */
export declare function decrypt(encryptedBase64: string, keyBase64: string): string;
