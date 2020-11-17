import { Component, OnInit } from '@angular/core';
import { APIMasterService } from '../services/api-master.service';
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
  }

  

  private selectedFile: File;
  theFilename = "" ;
  onFileSelect(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile.name);
    
    var ext = this.selectedFile.name.substr(this.selectedFile.name.lastIndexOf('.') + 1);
        
    var extSource = '';
    var mes = 'Filename: ' + this.selectedFile.name;

    if(ext === 'txt'){
      extSource = 'assets\\images\\txtIcon.png';
    }else if(ext === 'docx') {
      extSource = 'assets\\images\\docxIcon.png';
    }else if(ext === 'csv') {
      extSource = 'assets\\images\\csvIcon.png';
    }else if(ext === 'xlsm') {
      extSource = 'assets\\images\\xlsxIcon.png';
    }else{
      extSource = 'assets\\images\\errorIcon.png'
      mes = 'Error: Unsupported file type'
    }

    const fileImage = document.getElementById('fileType') as HTMLImageElement;
    fileImage.src = extSource;
    this.theFilename = mes;
    
    //upload file
    this.analyzeData();


  }

  ItemsArray= [
    {id: "1", name: "test", email: "asdasd"},
    {id: "3", name: "test1", email: "asdasgggh"},
    {id: "2", name: "test2", email: "asdsdfff"}    
  ];

  toPop = [];
  public populateGrid(result){

    var counter = 0;

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

  public analyzeData() {
    
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
