import { Component, OnInit } from '@angular/core';
import users from '../../user.json';
import { Router } from '@angular/router';
import { DataService } from '../../service/data.service';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import referredEntities from '../../Table_data.json';
import user from'../../user.json';
@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.css'],
})
export class SchemaComponent implements OnInit {
  schemaList = users.users;
  dropdownList: any;
  selectedItems: any;
  tabledata = referredEntities.referredEntities;
  tabledata2: any;
  uploadData: any;
  Uploaddesscription: any;
  sampledata: any;
  selectedClassification: any = [];
  dropdownSettings: any;
  showTable = false;
  spinner = true;
  role:any;
  isfileSelect = false;
  sourcename: any;
  name: any;
  database: any;
  data: any;
  data2: any;
  sheetname: any;
  edit = false;
  dtOptions: DataTables.Settings = {};
  constructor(
    public datservice: DataService,
    private router: Router,
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService
  ) {
    this.database = JSON.parse(localStorage.getItem('database')!);

    this.name = JSON.parse(localStorage.getItem('account')!);
    
    this.data2 = JSON.parse(localStorage.getItem('layers')!);
    this.data = JSON.parse(localStorage.getItem('layers2')!);
    
    this.sourcename = JSON.parse(localStorage.getItem('source')!).name;
    this.sheetname = JSON.parse(localStorage.getItem('sheets')!).name;
    
  }

  ngOnInit(): void {
   
    this.role=user.Authorization[0].role;
   
    this.dropdownList = referredEntities.classificationsType;
    this.tabledata2 = [...referredEntities.referredEntities].map((i) => ({
      ...i,
    }));
    
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'name',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: false,
    };
    this.updateBreadcrumb();
   
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true,
    };
   
    if (this.schemaList) {
      this.spinner = false;
    }
    this.showTable = true;
  }
  onItemSelect(item: any, obj: any) {
   
    this.isfileSelect = true;
   
   
  }
  onSelectAll(items: any, obj: any) {
  
   
    this.isfileSelect = true;
   
  }
  onDeselect(item: any, obj: any) {
    this.isfileSelect = true;
   
  }
  onDeselectAll(items: any, obj: any) {
    this.isfileSelect = true;
    
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
        url: 'layer',
      },
      { label: `${this.sheetname}`, url: '' },
    ];
    this.ngDynamicBreadcrumbService.updateBreadcrumb(breadcrumbs);
  }
  editSchema() {
    this.edit = true;
  }
  canceledit() {
    this.edit = false;
    this.isfileSelect = false;
    this.tabledata = [];
    $('#datatableexample').DataTable().destroy();

   
    this.tabledata =[... this.tabledata2].map((i) => ({
      ...i,
    }));
    setTimeout(() => {
      $('#datatableexample').DataTable({
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true,
        lengthMenu: [5, 10, 25],
      });
    }, 1);
    
  }
  save() {
    this.edit = false;
    
    this.tabledata2=[...this.tabledata].map((i) => ({
      ...i,
    }));
    
  }
  type(obj: any, objmain: any) {
    this.isfileSelect = true;
    objmain.description = obj;
   
  }
  onschemaData(event: any) {
   
    this.sheetname = event.obj.name;
    this.data = event.obj2;
    this.updateBreadcrumb();
  }
}
