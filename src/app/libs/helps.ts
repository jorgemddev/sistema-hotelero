import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { Responses } from '../models/interfaces/responses';
import { Users } from '../models/interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class Helps {
  constructor() {}

  public encrypt(token: any): string {
    const encryptedToken = CryptoJS.AES.encrypt(
      JSON.stringify(token),
      environment.sk
    ).toString();
    return encryptedToken;
  }
  public decrypt(token: any): any {
    const bytes = CryptoJS.AES.decrypt(token, environment.sk);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
  public saveToken(response: Responses) {
    sessionStorage.setItem(
      'token',
      this.encrypt({
        token: response.token,
        id: response.id,
        data: response.data,
        level: response.level,
      })
    );
  }
  public getToken(): Responses {
    return this.decrypt(sessionStorage.getItem('token'));
  }
  public deleteItem() {
    sessionStorage.removeItem('token');
  }

  public date() {
    let date: Date = new Date();
    return date;
  }
  public isNumber(x: any) {
    if (typeof x === 'number' && Number.isInteger(x)) {
      return true;
    } else {
      console.log('x no es un número entero');
      return false;
    }
  }

}