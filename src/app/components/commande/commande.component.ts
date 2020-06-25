import {Component, OnInit} from '@angular/core';
import {LigneFactService} from "../../service/ligne-fact.service";
import {LigneFact} from "../../models/ligne-fact";
import {Facture} from "../../models/facture";
import {FactureService} from "../../service/facture.service";
import * as jsPDF from 'node_modules/jspdf';
import 'jspdf-autotable';

function convertDate(inputFormat) {
  function pad(s) {
    return (s < 10) ? '0' + s : s;
  }

  var d = new Date(inputFormat)
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
}
@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss']
})
export class CommandeComponent implements OnInit {
  factures: Facture[] = [];

  constructor(private factureService: FactureService) {
  }

  ngOnInit(): void {
    this.factureService.findAll().subscribe(data => {
      this.factures = <Facture[]>data;
    }, error => {
      console.log(error);
    })
  }

  supprimer(facture: Facture) {
    this.factureService.deleteById(facture).subscribe(data => {
      this.factureService.findAll().subscribe(data => {
        this.factures = <Facture[]>data;
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
  }

  downloadPdf(facture: Facture) {
    let array2d = new Array(facture.ligne_factures.length);
    for (let i = 0; i < facture.ligne_factures.length; i++) {
      array2d[i] = new Array(4);
    }
    console.log(facture);
    console.log(facture.ligne_factures.length);
    console.log("//////////////////////");
    for (let i = 0; i < facture.ligne_factures.length; i++) {
      array2d[i][0] = facture.ligne_factures[i].ref;
      array2d[i][1] = facture.ligne_factures[i].produit.libelle;
      array2d[i][2] = facture.ligne_factures[i].qte;
      array2d[i][3] = facture.ligne_factures[i].prix;
    }
    console.log('/////////////////////////////');
    console.table(array2d);
    console.log(array2d);
     const doc = new jsPDF(), margin = 5;
    doc.setFont('courier');
    doc.setFontType('bolditalic');
    doc.setFontSize(22);
    doc.setTextColor(96,96,96);
    doc.text(90, 25, 'Mediatek');
    doc.setFont('courier');
    doc.setFontType('normal');
    doc.setFontSize(19);
    doc.setTextColor(102, 0, 204);
    doc.text(20, 40, 'Facture :' + facture.ref_fact);
    doc.setDrawColor(255, 0, 0);
    doc.setLineWidth(1.5);
    doc.line(20, 45, 200, 45);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica');
    doc.setFontType('bold');
    doc.text(20, 60, 'Monsieur :');
    doc.setFont('courier')
    doc.setFontType('normal')
    doc.text(50, 60, facture.client.nom + '  ' + facture.client.prenom);
    doc.setFont('helvetica');
    doc.setFontType('bold');
    doc.text(20, 70, 'Adresse :');
    doc.setFont('courier');
    doc.setFontType('normal');
    doc.text(50, 70, facture.client.adresse);
    doc.setFont('helvetica');
    doc.setFontType('bold');
    doc.text(20, 80, 'Telephone :');
    doc.setFont('courier');
    doc.setFontType('normal');
    doc.text(50, 80, facture.client.tel);
    doc.text(170, 60, convertDate(new Date()).toString());
    doc.setFont('helvetica');
    doc.setFontType('bold');
    doc.text(90, 95, 'Commandes :');
    doc.setDrawColor(0, 0, 250);
    doc.setLineWidth(0.5);
    doc.line(88, 98, 119, 98);
    doc.autoTable({html: '#my-table'})

    doc.autoTable({
      head: [['Commande', 'Produit', 'Quantite', 'Prix'],],
      columnStyles: {0: {halign: 'center', fillColor: [220, 220, 220]}},
      startY: 110,
      body: array2d,
    });
    doc.setFont('helvetica');
    doc.setFontType('bold');
    doc.text(150,190, 'Total :');
    doc.setFont('courier')
    doc.setFontType('normal')
    doc.text(170,190, facture.total+' DHS');
    doc.save('first.pdf');
  }
}
