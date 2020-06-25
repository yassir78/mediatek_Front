import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ClientService} from "../../service/client.service";
import {ProduitService} from "../../service/produit.service";
import {Produit} from "../../models/produit";
import {AuditStockService} from "../../service/audit-stock.service";

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styleUrls: ['./update-produit.component.scss']
})
export class UpdateProduitComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdateProduitComponent>,
              @Inject(MAT_DIALOG_DATA) public data, private produitService: ProduitService,private auditStockService:AuditStockService) {
  }

  ngOnInit(): void {
  }

  update(produit: Produit) {
 this.produitService.update(produit.num_prod,produit).subscribe(data=>{
   console.log("////////////////");
   console.log(produit);
   if(produit.stock >= 5){
     this.auditStockService.deleteByLibelleProduit(produit.libelle).subscribe(data=>{
       console.log('update was dine successfully');
     });
   }
   this.dialogRef.close();
 },error => {
   console.log(error);
 })
  }
}
