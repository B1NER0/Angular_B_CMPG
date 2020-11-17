import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularPro2B';

  constructor(private router: Router){}

  login(){
    this.router.navigate(['/login'])
    console.log("ASDF")
  }
}
