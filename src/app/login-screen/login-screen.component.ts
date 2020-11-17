import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { APIMasterService } from '../services/API/api-master.service';


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
    //this.apiReq.login();

    this.apiReq.checkIfAuth('home');
  }

  log(){
   
    
  
  }

  isShown: boolean = false;

  login(){
    var email = (<HTMLInputElement>document.getElementById('inputEmail')).value;
    var password = (<HTMLInputElement>document.getElementById('inputPassword')).value;
    var errCred = <HTMLInputElement>document.getElementById('credEr');
    
    this.isShown = false;
    this.apiReq.login(email, password).subscribe(res => {   
        let d: any = res;
        localStorage.setItem('token', d.token)
        this.apiReq.checkIfAuth('home');
  },
  () => {
    this.isShown = true;
  })  
  }
}
