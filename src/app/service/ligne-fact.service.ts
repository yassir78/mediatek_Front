import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LigneFactService {

  constructor(private http:HttpClient) { }
  findAll(){
    return this.http.get('http://localhost:7700/mediatek-api/ligne_fact/');
  }
}
