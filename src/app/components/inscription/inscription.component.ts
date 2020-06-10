import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Client} from "../../models/client";
import {ClientService} from "../../service/client.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  client:Client=new Client();
  Cpassword:string;
  enable:boolean=true;
  constructor(@Inject(DOCUMENT) private _document,private clientService:ClientService,private router:Router) { }

  ngOnInit(): void {
    this._document.body.style.background = '#32e0c4';
  }

  OnSubmit(value: any) {
    if(this.client.password != this.Cpassword){
      this.enable = false;
    }
    if(this.client.nom && this.client.prenom  && this.client.adresse && this.client.tel && this.client.email && this.Cpassword && this.client.password && this.Cpassword == this.client.password ){
      this.clientService.findByPasswordAndEmail(this.client).subscribe(
        data=>{
         if(!data){
           this.clientService.save(this.client).subscribe(data=>{
             console.log("the save was done successfuly ");
             this.router.navigate(['/connexion']);
           },error => {
             console.log(error);
           });
         }else{
           console.log('client existe deja');
         }
        },error => {
          console.log(error);
        }
      )
    }

  }
}
