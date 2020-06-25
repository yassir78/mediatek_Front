import {Produit} from "./produit";
import {Facture} from "./facture";
import * as uuid from 'uuid';
export class LigneFact {
  public id:number;
  public ref:string;
  public qte:number;
  public produit:Produit;
  public prix:number;
  constructor() {
    this.ref = uuid.v4();
  }

}
