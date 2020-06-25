import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-save-fact',
  templateUrl: './save-fact.component.html',
  styleUrls: ['./save-fact.component.scss']
})
export class SaveFactComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SaveFactComponent>) { }

  ngOnInit(): void {
  }

  exit() {
    this.dialogRef.close();
  }
}
