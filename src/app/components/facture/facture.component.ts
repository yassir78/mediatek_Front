import {Component, Inject, OnInit} from '@angular/core';
import {Facture} from "../../models/facture";
import {DOCUMENT} from "@angular/common";
import {ClientService} from "../../service/client.service";
import {ProduitService} from "../../service/produit.service";
import {Client} from "../../models/client";
import {Produit} from "../../models/produit";
import {LigneFact} from "../../models/ligne-fact";
import {element} from "protractor";
import {MatDialog} from "@angular/material/dialog";
import {UpdateClientComponent} from "../../dialogs/update-client/update-client.component";
import {StockComponent} from "../../dialogs/stock/stock.component";
import {FactureService} from "../../service/facture.service";
import * as jsPDF from 'node_modules/jspdf';
import 'jspdf-autotable';
import {SaveFactComponent} from "../../dialogs/save-fact/save-fact.component";
import {Router} from "@angular/router";
import {TriggerComponent} from "../../dialogs/trigger/trigger.component";

function convertDate(inputFormat) {
  function pad(s) {
    return (s < 10) ? '0' + s : s;
  }

  var d = new Date(inputFormat)
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
}

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {
  facture: Facture = new Facture();
  clients: Client[];
  produits: Produit[];
  selectedClient: string;
  commandes: LigneFact[] = [];

  constructor(@Inject(DOCUMENT) private _document, private clientService: ClientService, private factureService: FactureService, private produitService: ProduitService, private dialog: MatDialog,private router:Router) {
  }

  ngOnInit(): void {
    this.produitService.findAll().subscribe(data => {
      this.produits = <Produit[]>data;
    });
    this.clientService.findByRole('client').subscribe(data => {
      this.clients = <Client[]>data;
    })
    this._document.body.style.background = "#ffe8df";
  }

  selectClientMethod(client: Client) {
    this.selectedClient = `${client.nom} ${client.prenom}`;
    this.facture.client = client;
  }

  selectedProduct(produit: Produit) {
    console.log('this is selectedProduct function');
    let found: boolean = false;
    if (this.commandes) {
      this.commandes.forEach(element => {
        if (element.produit.libelle == produit.libelle) {
          element.qte += 1;
          found = true;
        }
      });
    }
    console.log(found);
    if (found == false) {
      let commande: LigneFact = new LigneFact();
      commande.produit = produit;
      commande.qte = 1;
      this.commandes.push(commande);
    }
    console.log("////////////////");
    console.log(this.commandes);
  }

  delete(commande: LigneFact) {
    let i = this.commandes.indexOf(commande);
    this.commandes.splice(i, 1);
  }

  addQte(commande: LigneFact) {
    if (commande.qte < commande.produit.stock) {
      commande.qte += 1;
    } else {
      const dialogRef = this.dialog.open(StockComponent, {
        height: '15vh',
        width: '30vw',
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('closed');
      });
    }

  }

  removeQte(commande: LigneFact) {
    if (commande.qte == 1) {
      let i = this.commandes.indexOf(commande);
      this.commandes.splice(i, 1);
    }
    if (commande.qte > 0) {
      commande.qte -= 1;
    }
  }

  saveFact() {
    let total: number = 0;
    let save:boolean =false;
    if (this.facture.client && this.commandes.length > 0) {
      ///////////////////////////////////////////////////////////////////////////////
      this.commandes.forEach(element=>{
        if(element.produit.stock < 5){
          save = true;

          const dialogRef = this.dialog.open(TriggerComponent, {
            height: '15vh',
            width: '42vw',
          });

          dialogRef.afterClosed().subscribe(result => {
          });
        }
      });
      /////////////////////////////////////////////////////////////////////////////////
      if(save == false){
        this.commandes.forEach(element => {
          element.prix = element.produit.prix * element.qte;
          total += element.prix;
        });
        this.facture.ligne_factures = this.commandes;
        this.facture.total = total;
        this.factureService.saveFact(this.facture).subscribe(data => {
          this.produitService.findAll().subscribe(data => {
            this.produits = <Produit[]>data;
            const dialogRef = this.dialog.open(SaveFactComponent, {
              height: '17vh',
              width: '30vw',
            });

            dialogRef.afterClosed().subscribe(result => {
              this.router.navigate(['/adminDash']);
            });

          });
        }, error => {
          console.log(error);
        });
      }

    }

  }


}
