import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ClientService} from "../../service/client.service";
import {Client} from "../../models/client";
import {DOCUMENT} from "@angular/common";
function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  let copy = obj.constructor();
  for (let attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.scss']
})
export class UpdateClientComponent implements OnInit {
  copyData:Client;
  errormessage:string;
  constructor(@Inject(DOCUMENT) private _document,public dialogRef: MatDialogRef<UpdateClientComponent>,
              @Inject(MAT_DIALOG_DATA) public data, private clientService:ClientService) { }

  ngOnInit(): void {
    this._document.body.style.background="#ffe8df";
    this.copyData = clone(this.data.client);
  }

  update(client: Client) {
    this.clientService.update(this.data.client.num_cli,this.data.client).subscribe(data=>{

      this.dialogRef.close();
    },error => {
      console.log(error);
    })
  }
}
