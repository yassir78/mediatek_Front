import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Client} from "../../models/client";
import {ClientService} from "../../service/client.service";
import {Router} from "@angular/router";
import {UpdateClientComponent} from "../../dialogs/update-client/update-client.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-dash-client',
  templateUrl: './dash-client.component.html',
  styleUrls: ['./dash-client.component.scss']
})
export class DashClientComponent implements OnInit {
  clients: Client[] = [];
  Element: string;
  array: Client[] = [];
  ////////////////////////////
  addClient:Client = new Client();
  errorMessage: string;
  ////////////////////////////
  constructor(@Inject(DOCUMENT) private _document, private clientService: ClientService, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this._document.body.style.background = "#ffe8df";
    this.clientService.findByRole("client").subscribe(
      data => {
        this.clients = <Client[]>data;

      }
    )
  }

  sortByNom() {
    if (this.clients) {
      console.log(this.clients);
      this.clients.sort((a, b) => {
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

  deleteClient(client: Client) {
    console.log(client);
    let i = this.clients.indexOf(client);
    this.clients.splice(i, 1);
    this.clientService.deleteByNumCli(client).subscribe(
      data => {
        console.log('the client was deleted');
      }, error => {
        console.log(error);
      }
    )
  }


  chercher() {
    let array1: Client[] = []
    if (this.array.length == 0) {
      this.array = [];
      this.clients.forEach((element) => {
        this.array.push(element);
      })
    }
    this.clients = this.array;
    if (this.Element) {
      this.clients.forEach((element, index) => {
        if (element.nom.startsWith(this.Element) || element.prenom.startsWith(this.Element)) {
          array1.push(element);
        }
      });
    } else {
      this.clients = this.array;
    }
    if (array1.length > 0) {
      this.clients = array1;
    }


  }

  sortByNumCli() {
    this.clients.sort((a, b) => {
      return a.num_cli - b.num_cli;
    })
  }

  sortByPrenom() {
    if (this.clients) {
      this.clients.sort((a, b) => {
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

  openDialog(client: Client) {
    const dialogRef = this.dialog.open(UpdateClientComponent, {
      height: '70vh',
      width: '40vw',
      data: {client}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.clientService.findByRole("client").subscribe(
        data => {
          this.clients = <Client[]>data;
        }
      )
    });
  }

  addClientMethod() {
    console.log(this.addClient);
    this.errorMessage = "";
    if(this.addClient.prenom && this.addClient.nom && this.addClient.email && this.addClient.password && this.addClient.tel){
      this.clientService.findByEmailAndNomAndPrenom(this.addClient).subscribe(data=>{
        if(data){
          this.errorMessage = 'client existe deja';
        }else{
          this.clientService.save(this.addClient).subscribe(data=>{
            this.clientService.findByRole("client").subscribe(
              data => {
                this.clients = <Client[]>data;
              }
            )
          });

        }
      },error => {
        console.log(error);
      })
    }else{
      this.errorMessage = "remplissez tous les champs";
    }
  }
}
