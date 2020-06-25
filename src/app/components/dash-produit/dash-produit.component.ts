import {Component, Inject, OnInit} from '@angular/core';
import {Produit} from "../../models/produit";
import {ProduitService} from "../../service/produit.service";
import {Client} from "../../models/client";
import {Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";
import {UpdateClientComponent} from "../../dialogs/update-client/update-client.component";
import {MatDialog} from "@angular/material/dialog";
import {UpdateProduitComponent} from "../../dialogs/update-produit/update-produit.component";

@Component({
  selector: 'app-dash-produit',
  templateUrl: './dash-produit.component.html',
  styleUrls: ['./dash-produit.component.scss']
})
export class DashProduitComponent implements OnInit {
  produits: Produit[] = [];
  Element: string;
  array: Produit[] = [];
  libelle: string = "";
  prix: number=0;
  stock: number=0;
  errorMessage: string = "";

  constructor(@Inject(DOCUMENT) private _document,private produitService: ProduitService,private router:Router,private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this._document.body.style.background="#ffe8df";
    this.produitService.findAll().subscribe(data => {
      this.produits = <Produit[]> data;
    }, error => {
      console.log(error);
    })
  }

  chercher() {
    let array1: Produit[] = [];
    if (this.array.length == 0) {
      this.array = [];
      this.produits.forEach((element) => {
        this.array.push(element);
      })
    }
    this.produits = this.array;
    if (this.Element) {
      this.produits.forEach((element, index) => {
        if (element.prix.toString().startsWith(this.Element) || element.libelle.startsWith(this.Element) || element.stock.toString().startsWith(this.Element)) {
          array1.push(element);
        }
      });
    } else {
      this.produits = this.array;
    }
    if (array1.length > 0) {
      this.produits = array1;
    }
  }

  sortByNumProd() {
    this.produits.sort((a, b) => {
      return a.num_prod - b.num_prod;
    });
  }

  sortBylibelle() {
    if (this.produits) {
      this.produits.sort((a, b) => {
        let fa = a.libelle.toLowerCase();
        let fb = b.libelle.toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      })
    }
  }

  sortByPrix() {
    this.produits.sort((a, b) => {
      return a.prix - b.prix;
    });
  }

  deleteproduct(produit: Produit) {
    let i = this.produits.indexOf(produit);
    this.produits.splice(i, 1);
    this.produitService.deleteBylibelle(produit).subscribe(data => {
      console.log('the product was deleted');
    }, error => {
      console.log(error);
    })

  }

  edit(produit: Produit) {
    const dialogRef = this.dialog.open(UpdateProduitComponent, {
      height: '45vh',
      width: '40vw',
      data: {produit}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.produitService.findAll().subscribe(data => {
        this.produits = <Produit[]> data;
      }, error => {
        console.log(error);
      })
    });
  }

  addProduct() {
    this.errorMessage = '';
    if (!this.libelle || !this.prix || !this.stock) {
      this.errorMessage = 'Champs obligatoires';
    } else if (isNaN(this.prix) && isNaN(this.stock)) {
      this.errorMessage = 'Les champs prix et stock sont de type  nombre';
    } else if (isNaN(this.prix)) {
      this.errorMessage = 'Le champ prix est un nombre';
    } else if (isNaN(this.stock)) {
      this.errorMessage = 'Le champ stock est un nombre';
    } else {
      let produit: Produit = new Produit();
      produit.libelle = this.libelle;
      produit.prix = this.prix;
      produit.stock = this.stock;
      this.produitService.addProduct(produit).subscribe(data => {
        if (data) {
          produit = <Produit>data;
          this.produits.push(produit);
          this.libelle = "";
          this.prix = 0;
          this.stock = 0;
        } else {
          this.errorMessage = 'produit existe deja';
        }

      }, error => {
        console.log(error);
      })
    }
  }

  sortByStock() {
    this.produits.sort((a, b) => {
      return a.stock - b.stock;
    });
  }
}
