import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})

export class APIMasterService {

  constructor(private http: HttpClient, private rout: Router) { }

  private apiUrl = 'http://localhost:8080';
  
  private header; 

  getAllUsers(){
      this.http.get(this.apiUrl+'/users').subscribe((res) => {
      console.log(res);
    })
  }

  login(){
    this.http.post(this.apiUrl+'/login', {
      email: "binero@gmail.com",
      password: "testing"
    }).subscribe({
      next: data => {
        console.log(data);
        let d: any = data;
        localStorage.setItem('token', d.token)
        //Go to homepage
        this.header = new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('token')}`
        });
        this.rout.navigate(['/home']);
      },
      error: error => {
        console.log('asdasdasdasd' + error.message);        
      }
    },)

    this.rout.navigate(['/home']);
  }

  

  checkAuth(){
    const result = new Subject<boolean>();
      this.http.post(this.apiUrl + '/auth', {headers: this.header}).subscribe(
        res => {
          result.next(true);
          console.log('HIIER');
        }
      );

      return result.asObservable();
  }

  theData:any = [];

  public getAnalysedData(): Observable<any>{    
    return this.http.get<any>(this.apiUrl + '/getData');
      
  }

  async loggedIn(){

    return true;

  }

  
  
}


  