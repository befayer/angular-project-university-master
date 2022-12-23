import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Document} from "../entities/Document";
import {Card} from "../entities/Card";

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private url = "http://localhost:8080/api/cards";

  constructor(private http: HttpClient) {
  }

  getCards() {
    return this.http.get<Array<Card>>(this.url);
  }

  getCard(id: number | string) {
    return this.http.get<Card>(this.url + '/' + id);
  }

  createCard(card: Card) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<Card>(this.url, JSON.stringify(card), {headers: myHeaders});
  }

  updateCard(id: number | string, card: Card) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put<Card>(this.url + '/' + id, JSON.stringify(card), {headers: myHeaders});
  }

  deleteCard(id: number | string) {
    return this.http.delete<Card>(this.url + '/' + id);
  }
}
