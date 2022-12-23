import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Student} from "../entities/Student";
import {Bank} from "../entities/Bank";
import {DocumentType} from "../entities/DocumentType";
import {parseDateToString} from "../helpers/help-functions";
import {Currency} from "../entities/Currency";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private url = "http://localhost:8080/api/currencies";

  constructor(private http: HttpClient) {
  }

  getCurrencies() {
    return this.http.get<Array<Currency>>(this.url);
  }

  getCurrency(id: number | string) {
    return this.http.get<Currency>(this.url + '/' + id);
  }

  createCurrency(currency: Currency) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<Currency>(this.url, JSON.stringify(currency), {headers: myHeaders});
  }

  updateCurrency(id: number | string, currency: Currency) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put<Currency>(this.url + '/' + id, JSON.stringify(currency), {headers: myHeaders});
  }

  deleteCurrency(id: number | string) {
    return this.http.delete<Currency>(this.url + '/' + id);
  }
}
