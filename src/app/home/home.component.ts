import { Component, OnInit } from '@angular/core';
import { APIMasterService } from '../services/API/api-master.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private apiReq: APIMasterService, private router: Router) { }

  ngOnInit(): void {
    var theUser = localStorage.getItem('username');
    document.getElementById('theUser').innerHTML = theUser;
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    this.router.navigate(['']);
  }  

  private selectedFile: File;
  theFilename = "" ;
  onFileSelect(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile.name);
    
    var ext = this.selectedFile.name.substr(this.selectedFile.name.lastIndexOf('.') + 1);
        
    var extSource = '';
    var mes = 'Filename: ' + this.selectedFile.name;

    var flag = false;

    if(ext === 'txt'){
      extSource = 'assets\\images\\txtIcon.png';
      flag = true;
    }else if(ext === 'docx') {
      extSource = 'assets\\images\\docxIcon.png';
      flag = true;
    }else if(ext === 'csv') {
      extSource = 'assets\\images\\csvIcon.png';
      flag = true;
    }else if(ext === 'xlsm') {
      extSource = 'assets\\images\\xlsxIcon.png';
      flag = true;
    }else{
      extSource = 'assets\\images\\errorIcon.png'
      mes = 'Error: Unsupported file type'
      flag = false;
    }

    const fileImage = document.getElementById('fileType') as HTMLImageElement;
    fileImage.src = extSource;
    this.theFilename = mes;

    if(flag){     
      //upload file
      this.apiReq.uploadFile(event.target.files[0]);
      this.analyzeData();
    }
  }

  goToNewUser(){
    this.apiReq.checkIfAuth('newUser');
  }

  ItemsArray= [[
    {},]   
  ];

  toPop = [];
  public populateGrid(result){

    var counter = 0;
    this.ItemsArray= [[
      {},]   
    ];

    let r = result.map(a => a.Person);

    r[0].forEach(element => {
      counter = counter + 1;

      this.toPop.push({
        id: counter,
        data: element,
        category: 'Person'
      })
    });

    r = result.map(a => a.IDNumber);

    r[1].forEach(element => {
      counter = counter + 1;
      
      this.toPop.push({
        id: counter,
        data: element,
        category: 'ID Number'
      })
    });

    r = result.map(a => a.Phone);
    
    r[2].forEach(element => {
      counter = counter + 1;
      
      this.toPop.push({
        id: counter,
        data: element,
        category: 'Phone'
      })
    });

    r = result.map(a => a.Email);
    
    r[3].forEach(element => {
      counter = counter + 1;
      
      this.toPop.push({
        id: counter,
        data: element,
        category: 'Email'
      })
    });

    r = result.map(a => a.Religion);
    
    r[4].forEach(element => {
      counter = counter + 1;
      
      this.toPop.push({
        id: counter,
        data: element,
        category: 'Religion'
      })
    });

    r = result.map(a => a.Location);
    
    r[5].forEach(element => {
      counter = counter + 1;
      
      this.toPop.push({
        id: counter,
        data: element,
        category: 'Location/Address'
      })
    });

    r = result.map(a => a.BankingNumber);
    
    r[6].forEach(element => {
      counter = counter + 1;
      
      this.toPop.push({
        id: counter,
        data: element,
        category: 'Banking'
      })
    });
    
    this.ItemsArray = this.toPop;
    console.log(this.toPop)

  }

  classified: any;

  public startUpload(){

  }

  public analyzeData() {
    this.ItemsArray = [];
    try{
        this.apiReq.getAnalysedData().subscribe(result => {
        this.classified = result;
        console.log(result)//this.classified[0]['Person'][3]
        this.populateGrid(result);
        return true;
        
        });
    }catch(err){
      console.log(err)
      return false;
    }

  }


}
