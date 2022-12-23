import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Document} from "../entities/Document";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private url = "http://localhost:8080/api/documents";

  constructor(private http: HttpClient) {
  }

  getDocuments() {
    return this.http.get<Array<Document>>(this.url);
  }

  getDocument(id: number | string) {
    return this.http.get<Document>(this.url + '/' + id);
  }

  createDocument(document: Document) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<Document>(this.url, JSON.stringify(document), {headers: myHeaders});
  }

  updateDocument(id: number | string, document: Document) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put<Document>(this.url + '/' + id, JSON.stringify(document), {headers: myHeaders});
  }

  deleteDocument(id: number | string) {
    return this.http.delete<Document>(this.url + '/' + id);
  }
}
