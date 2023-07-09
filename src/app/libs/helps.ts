import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { Responses } from '../models/interfaces/responses';
import { Users } from '../models/interfaces/users';
import { differenceInDays } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class Helps {
  constructor() { }

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
        hasStartedCash: response.hasStartedCash,
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
  public firstDayMonth(month: number = null, year: number = null): Date {

    const currentDate = ((month > 1 && month <= 12) && (year > 2000)) ? new Date(year, month) : new Date();
    const yearR = currentDate.getFullYear();
    const monthR = currentDate.getMonth();
    return new Date(yearR, monthR, 1);
  }
  public lastDayMonth(month: number = null, year: number = null): Date {
    const currentDate = ((month > 1 && month <= 12) && (year > 2000)) ? new Date(year, month) : new Date();
    const yearR = currentDate.getFullYear();
    const monthR = currentDate.getMonth();
    // Obtener el último día del mes
    return new Date(year, month + 1, 0);
  }
  public isNumber(x: any) {
    if (typeof x === 'number' && Number.isInteger(x)) {
      return true;
    } else {
      console.log('x no es un número entero');
      return false;
    }
  }

  public countDays(start: string, end: string): number {
    const startDay = new Date(start);
    const endDay = new Date(end);
    // Calcula la diferencia en milisegundos entre las fechas
    const diff = endDay.getTime() - startDay.getTime();
    // Convierte la diferencia de milisegundos a días
    const day = Math.floor(diff / (1000 * 60 * 60 * 24));
    console.log("DAYS:", day); // Imprime el número de días
    return day;

  }

  /**
   * Dias para terminar el mes actual
   */
  public daysToEndMonth():number {
    const fechaActual = new Date();
    const primerDiaSiguienteMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 1);
    return differenceInDays(primerDiaSiguienteMes, fechaActual);
  }
  public getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }

}
