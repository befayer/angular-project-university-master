import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Student} from "../entities/Student";
import {Bank} from "../entities/Bank";
import {DocumentType} from "../entities/DocumentType";
import {parseDateToString} from "../helpers/help-functions";

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {
  private url = "http://localhost:8080/api/document-types";

  constructor(private http: HttpClient) {
  }

  getDocumentTypes() {
    return this.http.get<Array<DocumentType>>(this.url);
  }

  getDocumentType(id: number | string) {
    return this.http.get<DocumentType>(this.url + '/' + id);
  }

  createDocumentType(documentType: DocumentType) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<DocumentType>(this.url, JSON.stringify(documentType), {headers: myHeaders});
  }

  updateDocumentType(id: number | string, documentType: DocumentType) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put<DocumentType>(this.url + '/' + id, JSON.stringify(documentType), {headers: myHeaders});
  }

  deleteDocumentType(id: number | string) {
    return this.http.delete<DocumentType>(this.url + '/' + id);
  }
}
