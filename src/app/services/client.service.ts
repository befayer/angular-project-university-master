import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Student} from "../entities/Student";
import {Client} from "../entities/Client";
import {parseDateToString} from "../helpers/help-functions";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private url = "http://localhost:8080/api/clients";

  constructor(private http: HttpClient) {
  }

  getClients() {
    return this.http.get<Array<Client>>(this.url);
  }

  getClient(id: number | string) {
    return this.http.get<Client>(this.url + '/' + id);
  }

  createClient(client: Client) {
    client.birthday = parseDateToString(client.birthday);
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<Client>(this.url, JSON.stringify(client), {headers: myHeaders});
  }

  updateClient(id: number | string, client: Client) {
    client.birthday = parseDateToString(client.birthday);
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put<Student>(this.url + '/' + id, JSON.stringify(client), {headers: myHeaders});
  }

  deleteClient(id: number | string) {
    return this.http.delete<Client>(this.url + '/' + id);
  }
}
