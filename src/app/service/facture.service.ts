import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Facture} from "../models/facture";

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  constructor(private http:HttpClient) { }
  saveFact(facture:Facture){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })};
    return this.http.post("http://localhost:7700/mediatek-api/facture/",facture,httpOptions);
  }
  findAll(){
    return this.http.get("http://localhost:7700/mediatek-api/facture/");
  }
  deleteById(facture:Facture){
    return this.http.delete(`http://localhost:7700/mediatek-api/facture/id/${facture.num_fact}`);
  }
}
