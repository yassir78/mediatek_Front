import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Produit} from "../models/produit";

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http:HttpClient) { }
  findById(id:number){
    return this.http.get(`http://localhost:7700/mediatek-api/produit/id/${id}`);
  }
  findAll(){
    return this.http.get('http://localhost:7700/mediatek-api/produit/');
  }
  deleteBylibelle(produit:Produit){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })};
    return this.http.delete(`http://localhost:7700/mediatek-api/produit/libelle/${produit.libelle}`,httpOptions);
  };
  addProduct(produit:Produit){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })};
    return this.http.post(`http://localhost:7700/mediatek-api/produit/`,produit,httpOptions);
  };
  update(id:number,produit:Produit){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })};
    return this.http.put(`http://localhost:7700/mediatek-api/produit/id/${id}`,produit,httpOptions);
  }
  demande(produit:Produit){
    return this.http.get(`http://localhost:7700/mediatek-api/produit/num_prod/${produit.num_prod}`);
  }
}
