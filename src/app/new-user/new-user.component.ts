import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIMasterService } from '../services/API/api-master.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  constructor(private router: Router, private apiReg: APIMasterService) { }

  ngOnInit(): void {
  }

  isShown: boolean = false;
  isSucc: boolean = false;

  

  clearVal() {
    (<HTMLInputElement>document.getElementById('email')).value = '';
    (<HTMLInputElement>document.getElementById('pass')).value = '';;
    (<HTMLInputElement>document.getElementById('username')).value = '';;
    (<HTMLInputElement>document.getElementById('cPass')).value = '';;
  }

  createUser() {
    this.isShown = false;
    this.isSucc = false;

    var email = (<HTMLInputElement>document.getElementById('email')).value;
    var password = (<HTMLInputElement>document.getElementById('pass')).value;
    var username = (<HTMLInputElement>document.getElementById('username')).value;
    var cpassword = (<HTMLInputElement>document.getElementById('cPass')).value;

    if(email == '' || password === '' || cpassword === '' || username === '' || password !== cpassword){
      this.isShown = true;
    }else{
      this.apiReg.createUser(username, email, password).subscribe(res => {
        if(res.status === 200){
          this.isSucc = true;
          this.clearVal();
        }
      })
    }

  }
  test(){
    this.router.navigate(['/home']);
  }
}
