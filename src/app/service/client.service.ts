import { Injectable } from '@angular/core';
import {Client} from "../models/client";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }
  findByPasswordAndEmail(client:Client){
    return this.http.get(`http://localhost:7700/mediatek-api/client/email/${client.email}/password/${client.password}`);
  };
  save(client:Client){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })};
    return this.http.post(`http://localhost:7700/mediatek-api/client/`,client,httpOptions);
  };

}
