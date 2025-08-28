/**
 * HDLmEncryption short summary.
 *
 * HDLmEncryption description.
 * 
 * The following links may be helpful
 *   JavaScript AES 256 encryption example 
 *   https://developer.mozilla.org/en-US/docs/Web/API/AesGcmParams
 *   https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt
 *   https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey
 *   https://github.com/mdn/dom-examples/blob/main/web-crypto/encrypt-decrypt/aes-gcm.js
 *   https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey
 *   https://www.geeksforgeeks.org/javascript/javascript-uint8array-from-method/ 
 *   https://developer.mozilla.org/en-US/docs/Glossary/Base64
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
class HDLmEncryption {
  /* Convert the text string passed by the caller to a Crypto-Key
     that can be passed to the subtle interface */
  static async convertKey(passedKey) {
    /* Encode the key passed by the caller */
    let encodedKey = HDLmEncryption.getValueEncoded(passedKey);   
    /* Convert the encoded key to a Crypto-Key */
    let cryptoKey = await HDLmEncryption.importSecretKey(encodedKey); 
    return cryptoKey;
  }
  /* This routine is modeled after the Java code with the same
     name. Like the Java code it uses GCM mode and no padding.
     This combination is regarded as secure by NIST. This 
     routine must be passed an array of Unit8 bytes, not 
     characters in a string. */
  static async decrypt(key, value) {
    /* Make sure the key argument passed by the caller is a string */
    if (typeof key != 'string') {
      let errorText = `Key value passed to decrypt is not a string`;
      HDLmAssert(false, errorText);
    }
    /* Make sure the value argument passed by the caller is an object */
    /* console.log(typeof(value)); */
    if (typeof value != 'object') {
      let errorText = `Text value passed to decrypt is not an object`;
      HDLmAssert(false, errorText);
    }
    /* Build the initialization vector for use below */
    let initializationVector = window.crypto.getRandomValues(new Uint8Array(12));
    /* The initialization vector is reset to binary zeros. This is done 
       so that the decryption process yields consistent results. We must
       get the same result every time. */ 
    initializationVector = new Uint8Array(12);
    /* Build the algorithm object for use below */
    let algorithmObject = { "name": "AES-GCM",
                            "iv": initializationVector
                          };        
    /* Build a CryptoKey that is used below */
    let cryptoKey = await HDLmEncryption.convertKey(key); 
    /* console.log(valueLength); */
    /* Decrypt the value and return the decrpted value to the caller */                
    let decryptedValue = await window.crypto.subtle.decrypt(algorithmObject,
                                                            cryptoKey,
                                                            value);
    /* console.log(typeof(decryptedValue)); */                                   
    /* Get a view of the ArrayBuffer returned above. The array
       buffer does not support many operations. */
     const decryptedView = new Uint8Array(decryptedValue);
    /* Return the decrypted view to the caller. The raw ArrayBuffer
       does not support many operations. */
    return decryptedView;
  }
  /* This routine is modeled after the Java code with the same
     name. Like the Java code it uses GCM mode and no padding.
     This combination is regarded as secure by NIST. */
  static async encrypt(key, value) {
    /* Make sure the key argument passed by the caller is a string */
    if (typeof key != 'string') {
      let errorText = `Key value passed to encrypt is not a string`;
      HDLmAssert(false, errorText);
    }
    /* Make sure the value argument passed by the caller is a string */
    if (typeof value != 'string') {
      let errorText = `Text value passed to encrypt is not a string`;
      HDLmAssert(false, errorText);
    }
    /* Build the initialization vector for use below */
    let initializationVector = window.crypto.getRandomValues(new Uint8Array(12));
    /* The initialization vector is reset to binary zeros. This is done 
       so that the encryption process yields consistent results. We must
       get the same result every time. */ 
    initializationVector = new Uint8Array(12);
    /* Build the algorithm object for use below */
    let algorithmObject = { "name": "AES-GCM",
                            "iv": initializationVector
                          };                      
    /* Encode the value passed by the caller */
    let encodedValue = HDLmEncryption.getValueEncoded(value);                      
    /* Build a CryptoKey that is used below */
    let cryptoKey = await HDLmEncryption.convertKey(key); 
    /* Encrypt the value and return the encrpted value to the caller */                
    let encryptedValue = await window.crypto.subtle.encrypt(algorithmObject,
                                                            cryptoKey,
                                                            encodedValue);
    /* Get a view of the ArrayBuffer returned above. The array
       buffer does not support many operations. */
     const encryptedView = new Uint8Array(encryptedValue);
    /* Return the encrypted view to the caller. The raw ArrayBuffer
       does not support many operations. */
    return encryptedView;
  }
  /* Encode the value passed by the caller. This will produce
     a value in the form we can use for the encrypt operation. 
     The returned value is always an array of bytes  (Uint8Array)
     created after the passed stirng in encoded with UTF-8. */ 
  static getValueEncoded(passedValue) {
    let encoder = new TextEncoder();
    return encoder.encode(passedValue);
  }
  /* Convert the raw key passed by the caller to a Crypto-Key. 
     A promise is returned to the caller. Note that this is an
     asynchronous method. */
  static async importSecretKey(rawKey) {
    return window.crypto.subtle.importKey("raw", 
                                          rawKey, 
                                          "AES-GCM", 
                                          true, 
                                          ["encrypt", "decrypt"]);
  }
}