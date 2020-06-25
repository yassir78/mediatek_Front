import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {ClientService} from "../../service/client.service";
import {Client} from "../../models/client";
import {Router} from "@angular/router";


@Component({
  selector: 'app-admin-connex',
  templateUrl: './admin-connex.component.html',
  styleUrls: ['./admin-connex.component.scss']
})
export class AdminConnexComponent implements OnInit {
   Email:string;
   Password:string;
   enable:boolean=false;
   messageErreur:string="";
   administrateur:Client=new Client();
  constructor(@Inject(DOCUMENT) private _document,private clientService:ClientService,private router:Router) { }

  ngOnInit(): void {
    this._document.body.style.background="-webkit-linear-gradient(top, #6886c5, #27496d)";

  }

  onSubmit(value: any) {
    if(this.Password && this.Email){
      this.messageErreur='';
      this.administrateur.email = this.Email;
      this.administrateur.password = this.Password;
      this.clientService.findByPasswordAndEmail(this.administrateur).subscribe(
        data=>{
          if(data){
            this.administrateur =<Client> data;
            if(this.administrateur.role == 'client'){
              this.enable = true;
              this.messageErreur = 'email coorespondant a un client';
            }else{

             this.router.navigate(['/adminDash']);
            }
          }else{
            this.enable = true;
            this.messageErreur = 'administrateur inexistant';
          }
        },error => {
          console.log(error);
        }
      )




    }
  }
}
