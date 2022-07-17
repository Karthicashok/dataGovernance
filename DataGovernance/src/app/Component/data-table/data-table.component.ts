import { Component, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, take, Subscription } from 'rxjs';
import errors from '../../user.json';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { AppComponent } from '../../app.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit {
  public dblist: any[] | any;
  data: any;
  selectedData: any;
  imageData: any;
  accountName: any;
  selectedAccount: any;
  selectaccountname: any;
  selectedaccountpath: any;
  @Output() events: Observable<void> | any;
  showTable = false;
  spinner = false;
  dtOptions: DataTables.Settings = {};
  AccountList: any;
  constructor(
    private dataservice: DataService,
    private router: Router,
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService,
    private activatedRoute: ActivatedRoute,
    private app: AppComponent
  ) {
    // geting the selected object name and image path from the home component which is navigate with the help of state

    this.accountName = this.router.getCurrentNavigation()?.extras.state;
    if (this.accountName) {
      
      this.selectedAccount = this.accountName['accountname'];
      this.selectaccountname = this.accountName['accountname'];
      this.selectedaccountpath = this.accountName['accountpath'];
      this.getDblist(this.selectedaccountpath);
    }
    this.selectedData = JSON.parse(localStorage.getItem('source')!).name;
    this.imageData = JSON.parse(localStorage.getItem('source')!).image;
    
   
  }

  ngOnInit() {
    // intialize the data table
   
    this.updateBreadcrumb();
    this.activatedRoute.data.subscribe((data: any) => {
      
    });
    this.dblist = [];
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true,
    };
    this.getaccounts();
  }
  redirect(data: any) {
    // it will redirect to layers page with the selected data in the data tables and pass it as the state data
    localStorage.setItem('database', JSON.stringify(data));

    this.router.navigateByUrl('layer');
  }
  updateBreadcrumb(): void {
    const breadcrumbs = [
      { label: 'Home', url: 'home' },
      {
        label: this.selectedData,
        url: '',
      },
    ];
    this.ngDynamicBreadcrumbService.updateBreadcrumb(breadcrumbs);
  }
  getaccounts() {
    // It will call getAccounts() function in the data.service.ts and store the data value as it dropdown value
    this.dataservice.getAccounts().subscribe(
      (data: any) => {
        this.AccountList = data.value;
       

        if (this.accountName) {
          this.AccountList.map((res: any) => {
            if (this.accountName['data'] == res.name) {
              this.selectedAccount = res.name;
              this.change(res);
            }
          });
        }
      },
      (error: any) => {
       
        if(error.status==401){
          this.router.navigateByUrl('access_denied');
        }else{
          Swal.fire({
            icon: 'error',
            title: error.error.message,
            text:error.error.message,
          });
        }
       
      }
    );
  }
  getDblist(path: any) {
    this.showTable = false;
    this.spinner = true;
    // It will call the getdbData() function in the data.service.ts and the data table is reintialize again and store the data of it
    this.dataservice
      .getdbData(path)
      .pipe(take(1))
      .subscribe(
        (list: any) => {
         
          $('#datatableexample').DataTable().destroy();
          this.dblist = list.value;
         
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
              text: error.error.message,
            });
          }
         
        }
      );
  }
  change(Account: any) {
    // By clicking on the account data in the dropdown it will call the data list of it.
   
    this.selectaccountname = Account.name;
    this.selectedaccountpath = Account.path;
    this.updateBreadcrumb2(this.selectaccountname);
    // this.spinner = true;
    localStorage.setItem('account', JSON.stringify(Account));
    this.getDblist(Account.path);
  }
  goHome() {
    localStorage.clear();
  }
  updateBreadcrumb2(data: any): void {
    const breadcrumbs = [
      { label: 'Home', url: 'home' },
      {
        label: this.selectedData,
        url: '',
      },
      { label: data, url: '' },
    ];
    this.ngDynamicBreadcrumbService.updateBreadcrumb(breadcrumbs);
  }
}
