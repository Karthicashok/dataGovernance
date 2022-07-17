import { Component, OnInit } from '@angular/core';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService) {}

  ngOnInit(): void {
    const breadcrumb = {
      customText: 'This is Custom Text',
      dynamicText: 'Level 2 ',
    };
    this.ngDynamicBreadcrumbService.updateBreadcrumbLabels(breadcrumb);
  }
}
