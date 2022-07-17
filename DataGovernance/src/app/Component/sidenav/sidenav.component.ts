import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  imgdata: any;
  @Input() selectedLayer: any;
  @Input() selectedSheet: any;
  @Output() eventsSubject: EventEmitter<any> = new EventEmitter<any>();
  @Input() sourcename: any;
  @Input() accountname: any;
  @Input() accountpath: any;
  @Input() selecteddb: any;
  @Output() path: EventEmitter<any> = new EventEmitter<any>();
  @Input() selectedlayers: any;
  constructor(private dataservice: DataService, private router: Router) {}

  ngOnInit(): void {
    this.imgdata = JSON.parse(localStorage.getItem('source')!).image;
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
  goToschema(obj: any, obj2: any, layers: any) {
    localStorage.setItem('sheets', JSON.stringify(obj));
    localStorage.setItem('layers2', JSON.stringify(obj2));
    this.router.navigate(['/schema']);
    this.eventsSubject.emit({ obj, obj2 });
  }
}
