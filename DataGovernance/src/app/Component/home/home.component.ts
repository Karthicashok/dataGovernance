import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../service/data.service';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { environment } from 'src/environments/environment';
import resource from '../../resource.json';
import { AppComponent } from '../../app.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public dblist: any[] | any;
  displayContent = false;
  resources = resource.resources;
  constructor(
    private router: Router,
    private dataservice: DataService,
    private app: AppComponent
  ) {}

  async ngOnInit(): Promise<void> {
    // getting the count of the account data to display it in the items which is in the home page
    this.dataservice.getrole();
    this.dataservice.getAccounts().subscribe(
      (list: any) => {
        if (list != undefined) {
          this.displayContent = true;
         
          this.dblist = list['@search.count'];
         
          this.resources[2].items = this.dblist;
        }
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
  redirect(data: any) {
    //it will redirect to data page with the selected data.
    
    localStorage.setItem('source', JSON.stringify(data));
    this.router.navigateByUrl('data');
  }
}
