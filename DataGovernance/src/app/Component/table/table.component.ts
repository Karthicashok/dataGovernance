import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { DataService } from '../../service/data.service';
import { MatDialog } from '@angular/material/dialog';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { SchemaComponent } from '../schema/schema.component';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  userList: any;
  data: any;
  dtOptions: DataTables.Settings = {};
  spinner = true;
  showTable = false;
  database: any;
  name: any;
  sourcename: any;
  constructor(
    public datservice: DataService,
    private router: Router,
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService,
    public dialog: MatDialog,
    private app: AppComponent
  ) {
    this.database = JSON.parse(localStorage.getItem('database')!);

    this.name = JSON.parse(localStorage.getItem('account')!);
   

    this.data = JSON.parse(localStorage.getItem('tabledata')!);
   
    this.sourcename = JSON.parse(localStorage.getItem('source')!).name;
  }
  ngOnInit(): void {
    this.updateBreadcrumb();
    this.userList = [];
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true,
    };
    this.datservice
      .gettableData(this.data.path + '/tables')
      .pipe(take(1))
      .subscribe(
        (res: any) => {
         
          this.userList = res.value;
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
         
          if ((error.statusText = 'Unauthorized')) {
            this.router.navigateByUrl('access_denied');
          }
        }
      );
  }
  reverse() {
    localStorage.removeItem('tabledata');
    this.router.navigate(['layer']);
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
      { label: `${this.database.name}`, url: 'layer' },
      {
        label: `${this.data.name}`,
        url: '',
      },
    ];
    this.ngDynamicBreadcrumbService.updateBreadcrumb(breadcrumbs);
  }
}
