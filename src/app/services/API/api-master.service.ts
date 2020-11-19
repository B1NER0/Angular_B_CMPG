import { Injectable, ApplicationRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root',
})

export class APIMasterService {

  constructor(private http: HttpClient, private rout: Router, private ref: ApplicationRef) { }

  private apiUrl =  'http://hummingclassify.us-east-1.elasticbeanstalk.com'; //'http://localhost:8080';
  
  //private header; 

  getAllUsers(): Observable<any>{
      return this.http.get<any>(this.apiUrl+'/users');
  }

  login(theEmail, thePassword){
    return this.http.post(this.apiUrl+'/login', {email: theEmail,password: thePassword})
  }

  checkIfAuth(page){
    this.isAuth().subscribe(res => {
      if(res.status === 200){
        this.rout.navigate(['/'+page]);
      }
      return;
  },
  () => {
      console.log('Not logged in')
      this.rout.navigate(['']);
  })  
  }

  sendIdentifiedData(iData, userID): Observable<any>{
    return this.http.post<any>(this.apiUrl + '/sendData', {data: iData, uID: userID})
    
  }
  

  theData:any = [];

  public getAnalysedData(): Observable<any>{    
    return this.http.get<any>(this.apiUrl + '/getData');
      
  }

  header = new HttpHeaders({
    'Content-Type': 'application/json',
    'authorization': `Bearer ${localStorage.getItem('token')}`
  });

 isAuth(): Observable<any>{    

    this.header = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get<any>(this.apiUrl+'/auth', {headers: this.header, observe: 'response'});
   
  }

  createUser(tusername, temail, tpassword): Observable<any>{

    return this.http.post(this.apiUrl + '/newUser', {username: tusername, email: temail, password: tpassword}, {observe: 'response'})
  }


  //upload file

  fileToUpload : any;

  uploadFile(files: FileList){
    this.fileToUpload = files;
    let fileData = new FormData();

    fileData.append(`file`, this.fileToUpload, this.fileToUpload.name);

    this.http.post<any>(this.apiUrl + '/upload', fileData).subscribe((val) => {
      console.log(val);
    });
    return false;
  }
  
  
}


  