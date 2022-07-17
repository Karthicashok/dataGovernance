import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DataService } from '../../service/data.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  file: any;
  isfileSelect = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdateComponent>,
    private dataservice: DataService,
    private router: Router
  ) {
    
  }

  ngOnInit(): void {}
  fileChanged(e: any) {
    //uploading the file
    
    this.file = e.target.files[0];
    if (this.file) {
      this.isfileSelect = true;
    }
  }
  done(file: any) {
  
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    Swal.fire({
      title: 'File is Uploading. please Wait...',
      allowOutsideClick: false,
      showConfirmButton: false,
    });
    fileReader.onload = (e: any) => {
      const bufferArray = e?.target.result;
      const wb = XLSX.read(bufferArray, { type: 'buffer' });
     
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws);
      const fileName = this.file.name.split('.')[0];
      const upload = {
        data: wb,
        db: this.data.db,
        layer: this.data.layer,
      };
      this.dataservice.uploadschema(upload).subscribe(
        (res: any) => {
         
          Swal.fire({
            icon: 'success',
            title: 'File Uploaded Sucessfully.',
            showConfirmButton: false,
            timer: 2000,
          });
          this.dialogRef.close({
            data: undefined,
            select: false,
            fileExport: false,
          });
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
    
    };
  }
  close() {
    this.dialogRef.close();
  }
}
