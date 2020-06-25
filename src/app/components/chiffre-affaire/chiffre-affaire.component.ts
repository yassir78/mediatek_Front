import { Component, OnInit } from '@angular/core';
import {Chiffre} from "../../models/chiffre";
import {ChiffreService} from "../../service/chiffre.service";

@Component({
  selector: 'app-chiffre-affaire',
  templateUrl: './chiffre-affaire.component.html',
  styleUrls: ['./chiffre-affaire.component.scss']
})
export class ChiffreAffaireComponent implements OnInit {
  chiffres:Chiffre[]=[];
  constructor(private chiffreService:ChiffreService) { }

  ngOnInit(): void {
  this.chiffreService.findAll().subscribe(data=>{
    if(data){
      this.chiffres =<Chiffre[]> data;
    }
  })
  }

  sortByNumCli() {
    this.chiffres.sort((a, b) => {
      return a.numC - b.numC;
    });
  }

  sortByNom() {
    if (this.chiffres) {
      this.chiffres.sort((a, b) => {
        let fa = a.nom.toLowerCase();
        let fb = b.nom.toLowerCase();
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

  sortByPrenom() {
    if (this.chiffres) {
      this.chiffres.sort((a, b) => {
        let fa = a.prenom.toLowerCase();
        let fb = b.prenom.toLowerCase();
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

  sortByChiffre() {
    this.chiffres.sort((a, b) => {
      return a.chiffre_affaire - b.chiffre_affaire;
    });
  }

  sortByCategorie() {
    if (this.chiffres) {
      this.chiffres.sort((a, b) => {
        let fa = a.categorie.toLowerCase();
        let fb = b.categorie.toLowerCase();
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
}
