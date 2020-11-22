import { Injectable, ApplicationRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { stringify } from 'querystring';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})

export class APIMasterService {

  constructor(private http: HttpClient, private rout: Router, private ref: ApplicationRef) { }

  private apiUrl =  'http://54.162.93.32:8000'//'https://hummingclassify.us-east-1.elasticbeanstalk.com';
  
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
    console.log(iData);
    console.log(userID)
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

    return this.http.post<any>(this.apiUrl + '/newUser', {username: tusername, email: temail, password: tpassword}, {observe: 'response'})
  }


  //upload file

  fileToUpload : any;

  uploadFile(files: FileList): Observable<any>{
    this.fileToUpload = files;
    let fileData = new FormData();
    console.log(files)
    fileData.append(`file`, this.fileToUpload, this.fileToUpload.name);
    return this.http.post<any>(this.apiUrl + '/upload', fileData)
    
  }

  rebootServer(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/system/reboot');
  }
  
  getClientData(clientID : string): Observable<any>{
    return this.http.get<any>(this.apiUrl + '/getClientData/' + clientID);
  }
}


  