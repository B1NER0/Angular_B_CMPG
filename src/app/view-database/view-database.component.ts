import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router'
import { APIMasterService } from '../services/API/api-master.service';

@Component({
  selector: 'app-view-database',
  templateUrl: './view-database.component.html',
  styleUrls: ['./view-database.component.scss']
})
export class ViewDatabaseComponent implements OnInit {

  constructor(private apiReq: APIMasterService, private router: Router) { }

  clientArray = []
  ngOnInit(): void {
  }

  noClient : boolean;

  search() {
    var clientID = <HTMLInputElement>document.getElementById('clientID');

    this.noClient = false;
    if(clientID.value){
      this.apiReq.getClientData(clientID.value).subscribe(res => {
        console.log(res);
        this.clientArray = res;
      })
    }else{
      this.noClient = true;
    }
    
  }

}
