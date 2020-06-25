import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuditStockService {

  constructor(private http:HttpClient) { }
  deleteByLibelleProduit(libelle:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })};
    return this.http.delete(`http://localhost:7700/mediatek-api/audit_stock/delete/${libelle}`,httpOptions);
  }
}
