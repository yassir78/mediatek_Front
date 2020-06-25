import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.scss']
})
export class AdminDashComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document) { }

  ngOnInit(): void {
    this._document.body.style.background="#ffe8df";
  }

}
