import { Injectable } from '@nestjs/common';
import * as NodeRSA from 'node-rsa';

@Injectable()
export class EncryptionService {
  private publicKey: string;
  private privateKey: string;

  constructor() {
    const { privateKey, publicKey } = this.generateKeyPairs();
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  encrypt(data) {
    return new NodeRSA(this.publicKey, 'public', {
      encryptionScheme: 'pkcs1',
    }).encrypt(data, 'base64', 'utf8');
  }

  decrypt(data) {
    return new NodeRSA(this.privateKey, 'private', {
      encryptionScheme: 'pkcs1',
    }).decrypt(data, 'utf8');
  }

  generateKeyPairs() {
    const keys = new NodeRSA().generateKeyPair();
    const publicKey = keys.exportKey('pkcs8-public-pem');
    const privateKey = keys.exportKey('pkcs1-pem');
    return { privateKey, publicKey };
  }
}
