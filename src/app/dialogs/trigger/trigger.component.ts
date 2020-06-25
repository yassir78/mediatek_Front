import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-trigger',
  templateUrl: './trigger.component.html',
  styleUrls: ['./trigger.component.scss']
})
export class TriggerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TriggerComponent>) { }

  ngOnInit(): void {

  }

  exit() {
    this.dialogRef.close();
  }
}
