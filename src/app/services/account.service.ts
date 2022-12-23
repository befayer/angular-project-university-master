import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Document} from "../entities/Document";
import {Account} from "../entities/Account";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private url = "http://localhost:8080/api/accounts";

  constructor(private http: HttpClient) {
  }

  getAccounts() {
    return this.http.get<Array<Account>>(this.url);
  }

  getAccount(id: number | string) {
    return this.http.get<Account>(this.url + '/' + id);
  }

  createAccount(account: Account) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<Account>(this.url, JSON.stringify(account), {headers: myHeaders});
  }

  updateAccount(id: number | string, account: Account) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put<Account>(this.url + '/' + id, JSON.stringify(account), {headers: myHeaders});
  }

  deleteAccount(id: number | string) {
    return this.http.delete<Account>(this.url + '/' + id);
  }
}
