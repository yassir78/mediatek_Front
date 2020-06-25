import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<StockComponent>) { }

  ngOnInit(): void {
  }

  exit() {
    this.dialogRef.close();
  }
}
