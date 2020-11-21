import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router'

@Component({
  selector: 'app-view-database',
  templateUrl: './view-database.component.html',
  styleUrls: ['./view-database.component.scss']
})
export class ViewDatabaseComponent implements OnInit {

  constructor() { }

  clientArray = []
  ngOnInit(): void {
  }

  search() {

  }

}
