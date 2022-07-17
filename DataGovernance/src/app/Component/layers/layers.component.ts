import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { Xliff } from '@angular/compiler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { UpdateComponent } from '../update/update.component';
@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.css'],
})
export class LayersComponent implements OnInit {
  public layers: any;
  data: any;
  select = false;
  showTable = false;
  AccountList: any;
  dbList = false;
  upload = true;
  datatable: any;
  selectedId: any;
  sourcename: any;
  currentIndex: any;
  fileupload = false;
  fileExport = false;
  selectedDb: any;
  spinner = true;
  name: any;
  file: any;
  eventsAccount: EventEmitter<any> = new EventEmitter<any>();
  eventData: EventEmitter<any> = new EventEmitter<any>();
  selectedIndex: any;
  selectedIndex2: any;
  public selectedLayers: any;
  dtOptions: DataTables.Settings = {};
  constructor(
    private dataservice: DataService,
    private router: Router,
    private http: HttpClient,
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService,
    private app: AppComponent,
    public dialog: MatDialog
  ) {
    // getting the selected data which gets passed through routing from data component
    this.data = JSON.parse(localStorage.getItem('database')!);
   
    this.showlayers(this.data.path);
    this.name = JSON.parse(localStorage.getItem('account')!);
   
    this.sourcename = JSON.parse(localStorage.getItem('source')!).name;
  }

  ngOnInit() {
    // intialize the data table
    this.updateBreadcrumb();
   
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true,
    };
  }
  export() {
    // it is for export the selected data in the radio button and pass it path as parameter to getschemaList() then its path will be opened as excel sheet
    if (this.selectedLayers == undefined) {
      Swal.fire({
        icon: 'warning',
        title: 'Please Select the layer',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        title: 'File is Creating. please Wait...',
        allowOutsideClick: false,
        showConfirmButton: false,
        timer: 1500,
      });
      this.dataservice
        .getschemaList(this.selectedLayers.path + '/tables')
        .subscribe(
          async (res: any) => {
           
            const decryptedResponse = CryptoJS.AES.decrypt(
              res.data,
              environment.secret_key
            );
            const decryptedStringResponse = decryptedResponse.toString(
              CryptoJS.enc.Utf8
            );
          
            await this.downloadCSV(decryptedStringResponse, res.filename);
          },
          (error: any) => {
           
            if(error.status==401){
              this.router.navigateByUrl('access_denied');
            }else{
              Swal.fire({
                icon: 'error',
                title: error.error.message,
                text:  error.error.message,
              });
            }
           
          }
        );
    }
  }

  async downloadCSV(downloadurl: string, downloadItem: string) {
    try {
     
      const dwldLink = document.createElement('a');
      const url = downloadurl;
      const isSafariBrowser =
        navigator.userAgent.indexOf('Safari') !== -1 &&
        navigator.userAgent.indexOf('Chrome') === -1;
      if (isSafariBrowser) {
        dwldLink.setAttribute('target', '_blank');
      }
      dwldLink.setAttribute('href', url);
      
      dwldLink.setAttribute('download', 'schema_' + downloadItem);
      dwldLink.style.visibility = 'hidden';
      document.body.appendChild(dwldLink);
      dwldLink.click();
      document.body.removeChild(dwldLink);
    } catch (error) {
     
    }
  }
  updateBreadcrumb(): void {
    const breadcrumbs = [
      { label: 'Home', url: 'home' },
      {
        label: JSON.parse(localStorage.getItem('source')!).name,
        url: 'data',
      },
      {
        label: `${this.name.name}`,
        url: 'data',
      },
      {
        label: `${this.data.name}`,
        url: '',
      },
    ];
    this.ngDynamicBreadcrumbService.updateBreadcrumb(breadcrumbs);
  }

  onTaskSelect(obj: any) {
    // it will get the selected data in radio button
    this.select = true;
    this.fileExport = true;
   
    this.selectedLayers = obj;
  }

  async showlayers(res: any) {
    this.showTable = false;
    this.select = false;
    this.spinner = true;
    this.dataservice
      .getlayers(res)
      .pipe(take(1))
      .subscribe(
        async (data: any) => {
          $('#datatableexample').DataTable().destroy();
          this.layers = data.value;
          let templayer: any = [];
          templayer = await this.gettabledata();
          localStorage.setItem('layers', JSON.stringify(templayer));
         
          setTimeout(() => {
            $('#datatableexample').DataTable({
              pagingType: 'full_numbers',
              pageLength: 5,
              processing: true,
              lengthMenu: [5, 10, 25],
            });
          }, 1);
          this.showTable = true;
          this.spinner = false;
        },
        (error: any) => {
        
          if(error.status==401){
            this.router.navigateByUrl('access_denied');
          }else{
            Swal.fire({
              icon: 'error',
              title: error.error.message,
              text:  error.error.message,
            });
          }
         
        }
      );
  }

  async gettabledata() {
    let templayer;
    templayer = await this.layers.map(async (obj: any) => {
      
      let val = Promise.resolve(this.tableData(obj.path));
      val.then((tabledata) => {
       
        obj.tables = tabledata;
        localStorage.setItem(obj.name, JSON.stringify(tabledata));
       
      });

      
      return obj;
      
    });
    let final = await Promise.all(templayer);
    
    return final;
  }
  fileChanged(e: any) {
    //uploading the file
    
    this.file = e.target.files[0];
   
    if (this.file != undefined && this.file) {
      this.fileupload = true;
    } else {
      this.fileupload = false;
    }
   
  }
  uploadFile() {
    const dialogref = this.dialog.open(UpdateComponent, {
      width: '500px',
      height: '200px',
      disableClose: true,
      data: {
        db: this.selectedDb,
        layer: this.selectedLayers.name,
      },
    });
    dialogref.afterClosed().subscribe((res) => {
      // received data from dialog-component
      this.selectedLayers = res.data;
      this.select = res.select;
      this.fileExport = res.fileExport;
      window.location.reload();
    });
  }
  async tableData(path: any) {
  
    return new Promise((resolve, reject) => {
      this.dataservice.gettableData(path + '/tables').subscribe(
        (res: any) => {
          resolve(res.value);
        },
        (error: any) => {
         
          if(error.status==401){
            this.router.navigateByUrl('access_denied');
          }else{
            Swal.fire({
              icon: 'error',
              title: error.error.message,
              text:  error.error.message,
            });
          }
         
        }
      );
    });
  }
}
