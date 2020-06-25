import {Component, Inject, inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {ClientService} from "../../service/client.service";
import {Client} from "../../models/client";
import {Router} from "@angular/router";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  Email: string;
  Password: string;
  client: Client = new Client();
  enable: boolean = true;

  constructor(@Inject(DOCUMENT) private _document, private clientService: ClientService, private router: Router) {
  }

  ngOnInit(): void {
    this._document.body.style.background = '#2ecc71';
  }

  onSubmit(value: any) {

    if (this.Password && this.Email) {
      console.log('ejjejeje');
      this.client.password = this.Password;
      this.client.email = this.Email;
      this.clientService.findByPasswordAndEmail(this.client).subscribe(
        data => {
          if (!data) {
            this.enable = false;
            console.log('client non existant');
          } else {
            this.enable = true;
            this.router.navigate(['/inscription']);
          }
        }, error => {
          console.log(error);
        }
      )
    }


  }
}
