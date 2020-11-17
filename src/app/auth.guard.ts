import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { APIMasterService } from './services/api-master.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private apiReq: APIMasterService, private router: Router){}
  
  canActivate(): boolean{
    //route: ActivatedRouteSnapshot,
    //state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return true;

    if(this.apiReq.loggedIn()){
      return true;
    }else{
      this.router.navigate(['']);
      return false;
    }

  }
  
}
