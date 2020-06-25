import {Client} from "./client";
import {LigneFact} from "./ligne-fact";
import * as uuid from 'uuid';

export class Facture {
  public num_fact: number;
  public ref_fact:string;
  public data_fact: Date = new Date();
  public client: Client;
  public total:number;
  public ligne_factures: LigneFact[] = [];
  constructor() {
    this.ref_fact = uuid.v4();
  }
}
