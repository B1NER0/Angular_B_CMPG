import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { APIMasterService } from '../services/api-master.service';


@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {

  constructor(private apiReq: APIMasterService, private router: Router) { }

  ngOnInit(): void {
  }

  test(){
    this.apiReq.login();
    
  }

  login(){
   

  }

}
