import { Component, OnInit } from '@angular/core';
import { APIMasterService } from '../services/API/api-master.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatPseudoCheckbox, MatPseudoCheckboxState } from '@angular/material/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private apiReq: APIMasterService, private router: Router) { }
  showNo: boolean;

  ngOnInit(): void {
    var theUser = localStorage.getItem('username');
    document.getElementById('theUser').innerHTML = 'Logged in as : ' + theUser;
    this.isLoad = false;
    
    this.showNo = false;
  }

  
  
  catValues = [
    "Person",
    "Email",
    "Phone",
    "ID Number",
    "Location",
    "Banking",
    "Religion",
    "Other (specify)"
  ]

  onOptionSelected(value:string){
    var el = <HTMLInputElement> document.getElementById('otherData');
    el.value = '';
    if(value == 'Other (specify)'){      
      el.disabled = false;
    }
    else{
      el.disabled = true;
    }
    
  }
 
  isShown :boolean;
  isShownSubmit: boolean;
  manAddData(){

    var theVal = (<HTMLInputElement>document.getElementById('manData')).value;
    var otherData = (<HTMLInputElement>document.getElementById('otherData')).value
    var theCat = (<HTMLInputElement>document.getElementById('sel1')).value;


    if(theCat === 'Other (specify)'){
      if(otherData === ''){
        this.isShown = true;
        return;
      }
      else{
        this.isShown = false;
      }
        
      theCat = otherData;
    }

    if(theVal === ''){
      this.isShown = true;
    }else{
      this.isShown = false;
      
      var thisCount = this.toPop.length + 1;

      this.toPop.push({
        id: thisCount,
        data: theVal,
        category: theCat,
        status: 'YES'
      })    
  
      this.ItemsArray = this.toPop;
    }
  }

  viewDatabase() {
    this.apiReq.checkIfAuth('view')
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

  submitNo = document.getElementById('submitNo');

  submitData() {

    this.showNo = false;
   
    var test = <HTMLTableElement>(document.querySelector('#theTable'));

    var bla = test.tBodies[0].rows;

    var arr = [];

    Array.from(bla).forEach((row, idx) => {
      const tds = Array.from(row.cells).map(td => td.textContent);     
      arr.push(tds);
    })
    
    this.startSorting(arr);
  }

  startSorting(theArr){
      console.log(theArr)

      theArr.forEach(element => {
        if(element[3] === 'YES'){
          if(!this.itemsToSend.includes(element[2])){
            this.itemsToSend.push(element[2]);
          }          
        }
      });

      this.apiReq.sendIdentifiedData(this.itemsToSend, '30303052').subscribe(err  => {
        
        console.log(err)
        
      },
      () => {
        this.showNo = true;
        console.log('here')
      })
  }

  boxVals = ['YES', 'NO']
  ItemsArray= [];
  itemsToSend = [];

  showOptions(event: HTMLInputElement) {
    console.log('asdasdasd');

  }

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
        category: 'Person',
        status: 'YES'
      })
    });

    r = result.map(a => a.IDNumber);

    r[1].forEach(element => {
      counter = counter + 1;
      
      this.toPop.push({
        id: counter,
        data: element,
        category: 'ID Number',
        status: 'YES'
      })
    });

    r = result.map(a => a.Phone);
    
    r[2].forEach(element => {
      counter = counter + 1;
      
      this.toPop.push({
        id: counter,
        data: element,
        category: 'Phone',
        status: 'YES'
      })
    });

    r = result.map(a => a.Email);
    
    r[3].forEach(element => {
      counter = counter + 1;
      
      this.toPop.push({
        id: counter,
        data: element,
        category: 'Email',
        status: 'YES'
      })
    });

    r = result.map(a => a.Religion);
    
    r[4].forEach(element => {
      counter = counter + 1;
      
      this.toPop.push({
        id: counter,
        data: element,
        category: 'Religion',
        status: 'YES'
      })
    });

    r = result.map(a => a.Location);
    
    r[5].forEach(element => {
      counter = counter + 1;
      
      this.toPop.push({
        id: counter,
        data: element,
        category: 'Location/Address',
        status: 'YES'
      })
    });

    r = result.map(a => a.BankingNumber);
    
    r[6].forEach(element => {
      counter = counter + 1;
      
      this.toPop.push({
        id: counter,
        data: element,
        category: 'Banking',
        status: 'YES'
      })
    });
    
    this.ItemsArray = this.toPop;
    this.isLoad = false;
    //console.log(this.toPop)

  }

  classified: any;

  sendReq() {
    
  }

  isLoad: boolean = false;

  public analyzeData() {
    this.isLoad = true;
    this.ItemsArray = [];
    try{
        this.apiReq.getAnalysedData().subscribe(result => {
        this.classified = result;
        //console.log(result)//this.classified[0]['Person'][3]
        this.populateGrid(result);
        return true;
        
        });
    }catch(err){
      console.log(err)
      return false;
    }

  }


}
