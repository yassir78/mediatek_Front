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
  findALl(){
    return this.http.get('http://localhost:7700/mediatek-api/client/');
  }
  deleteByNumCli(client:Client){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })};
    return this.http.delete(`http://localhost:7700/mediatek-api/client/id/${client.num_cli}`,httpOptions);
  }
  findByRole(role:string){
    return this.http.get(`http://localhost:7700/mediatek-api/client/role/${role}`);
  }
  finById(id:number){
    return this.http.get(`http://localhost:7700/mediatek-api/client/id/${id}`);
  }
  update(id:number,client:Client){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })};
    return this.http.put(`http://localhost:7700/mediatek-api/client/num/${id}`,client,httpOptions);
  }
  findByEmailAndNomAndPrenom(client:Client){
    return this.http.get(`http://localhost:7700/mediatek-api/client/email/${client.email}/nom/${client.nom}/prenom/${client.prenom}`);
  }

}
