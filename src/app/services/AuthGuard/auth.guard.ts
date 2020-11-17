import { Injectable, NgZone } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { APIMasterService } from 'src/app/services/API/api-master.service'
import { ApplicationRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private apiReq: APIMasterService, private router: Router, private ref: ApplicationRef, private ngZone: NgZone){}
  
  test: any;


  /*checkAuthenticate(){
    this.apiReq.loggedIn().subscribe(response => {
      console.log('Logged in'); 
      this.test = response.status;
      this.ref.tick();
      
    },
    err => {
      console.log("NOT logged in")
      this.test = err;
      this.ref.tick();
    })

    

  }*/
  t = 'THIS: '

  testE$ = new BehaviorSubject<string>(this.t);
  canActivate(): boolean{
    //route: ActivatedRouteSnapshot,
    //state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return true;

   // if(this.apiReq.loggedIn()){

   
  //  this.checkAuthenticate();
     
    


   // if(this.test === 200){
    //  console.log(this.test);
   //   return true
   // }else{
   //   this.router.navigate(['']);
    //  return false;
    //}    

    
  //  this.apiReq.loggedIn().subscribe(res => {
    //  if(res){
     //   console.log(res);
       // this.t = res;

        
     // }      
  //  },err => 
  //  {
  //    return false;
  //  },
   /// () =>{
   //  this.t += 'asdasdasdasdasdsd';
    // this.testE$.next(this.t)
    //});;
    
   // this.ref.tick();
   // if(this.t){
   //   console.log(this.t);
  //  }else{
   //   console.log(this.t);
  //  }
    
    return false;
    

  }  
}
