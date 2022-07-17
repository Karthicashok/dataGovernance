import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  AfterViewInit,
} from '@angular/core';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit, AfterViewInit {
  AccountList: any;
  datatable: any;
  selectedIndex: any;
  selectedIndex2: any;
  selectedId: any;
  imgdata: any;
  @Input() selectedLayer: any;
  @Input() selectedSheet: any;
  @Input() account: any;
  @Input() db: any;
  @Output() eventsSubject: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventsSubject2: EventEmitter<any> = new EventEmitter<any>();
  @Input() eventsAccount: Observable<void> | any;
  @Input() eventsdb: Observable<void> | any;
  @Input() sourcename: any;
  @Input() accountname: any;
  @Input() accountpath: any;
  @Input() selecteddb: any;
  @Input() selectedsheets: any;
  @Output() path: EventEmitter<any> = new EventEmitter<any>();
  dbList = false;
  showTable = false;
  spinner = true;
  @Input() selectedlayers: any;
  constructor(private dataservice: DataService, private router: Router) {}

  ngOnInit(): void {
  
    this.imgdata = JSON.parse(localStorage.getItem('source')!).image;
  }
  ngAfterViewInit(): void {}

  ngOnChanges() {
    if (this.selectedlayers && this.selectedlayers.length > 0) {
      setTimeout(() => {
        
      }, 1000);
    } else {
      
    }
  }

  getpath() {
    if (this.router.url != "'data'") {
      this.router.navigateByUrl('data', {
        state: {
          accountname: this.accountname,
          accountpath: this.accountpath,
        },
      });
    }
    
    this.path.emit(this.accountpath);
  }
  backtodata() {
    if (this.router.url != "'data'") {
      this.router.navigateByUrl('data');
    }
  }
  gotoLayer() {
    if (this.router.url != "'layer'") {
      this.router.navigateByUrl('layer');
    }
  }
  gotoTable() {
    if (this.router.url != "'table'") {
      this.router.navigateByUrl('table');
    }
  }

  setlayertable(name: string) {
    this.selectedlayers = this.selectedlayers.filter((obj: any) => {
      let data: any = localStorage.getItem(obj.name);
      obj.tables = JSON.parse(data);
      return obj;
    });
    localStorage.setItem('layers', JSON.stringify(this.selectedlayers));
   
  }
  findTable(name: string) {
    let data = localStorage.getItem(name);
    
    
  }
  goToschema(obj: any, obj2: any, layers: any) {
   
    localStorage.setItem('sheets', JSON.stringify(obj));
    localStorage.setItem('layers2', JSON.stringify(obj2));
    this.router.navigate(['/schema']);
    this.eventsSubject.emit({ obj, obj2 });
  }
}
