import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Student} from "../entities/Student";
import {Bank} from "../entities/Bank";
import {parseDateToString} from "../helpers/help-functions";

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private url = "http://localhost:8080/api/banks";

  constructor(private http: HttpClient) {
  }

  getBanks() {
    return this.http.get<Array<Bank>>(this.url);
  }

  getBank(id: number | string) {
    return this.http.get<Bank>(this.url + '/' + id);
  }

  createBank(bank: Bank) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<Bank>(this.url, JSON.stringify(bank), {headers: myHeaders});
  }

  updateBank(id: number | string, bank: Bank) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put<Bank>(this.url + '/' + id, JSON.stringify(bank), {headers: myHeaders});
  }

  deleteBank(id: number | string) {
    return this.http.delete<Bank>(this.url + '/' + id);
  }
}
