import { Component, OnInit } from '@angular/core';
import { APIMasterService } from '../services/API/api-master.service';
import { Router } from '@angular/router';
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

  onThis(val: any){
    const curVal = this.toPop[val-1].status;

    if(curVal === 'YES'){
      this.toPop[val-1].status = 'NO'
    }else{
      this.toPop[val-1].status = 'YES'
    }
  }

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
    }else if(ext === 'xlsm' || ext === 'xlsx') {
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

    const test = <HTMLButtonElement>document.getElementById('btnAnalyse');
          test.disabled = true;

    if(flag){     
      //upload file      
      this.apiReq.uploadFile(event.target.files[0]).subscribe((val) => {
        if(val){
          this.ItemsArray = [];          
          test.disabled = false;         
        }
      });
            

    }
  }

  executeAnalyse() {
    this.analyzeData();
  }

  goToNewUser(){
    this.apiReq.checkIfAuth('newUser');
  }

  submitNo = document.getElementById('submitNo');

  noClient: boolean;
  submitData() {
    this.noClient = false;
    this.showNo = false;

    
    var clientID = <HTMLInputElement>document.getElementById('clientID')
    
    if(clientID.value){
      this.toPop.forEach(element => {
        if(element.status === 'YES'){
          if(!this.itemsToSend.includes(element.category)){
            this.itemsToSend.push(element.category);
          }          
        }
      });
  
      this.apiReq.sendIdentifiedData(this.itemsToSend, clientID.value).subscribe(err  => {
        
      console.log(err)
        
      },
      () => {
        this.showNo = true;
      })
    }else{
      this.noClient = true;
    }

    

    
  }

  

  boxVals = ['YES', 'NO']
  ItemsArray= [];
  itemsToSend = [];

 

  toPop = [];
  public populateGrid(result){

    var counter = 0;
    this.ItemsArray= [[
      {},]   
    ];

    this.toPop = [];

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
    console.log('POP')
    console.log(this.toPop)


    this.apiReq.rebootServer().subscribe(res => {
      console.log('Server Restarted');
    })
  }

  classified: any;

  sendReq() {
    
  }

  isLoad: boolean = false;

  public analyzeData() {
    this.isLoad = true;
    this.ItemsArray = [];
    try{
        this.apiReq.getAnalysedData().subscribe(res => {
        this.classified = res;
        this.populateGrid(res);
        return true;
        
        },
        err => {
          console.log('HIER');
          console.log(err);
        });
    }catch(err){
      console.log(err)
      return false;
    }
    

  }


}
