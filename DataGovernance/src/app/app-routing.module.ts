import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableComponent } from './Component/data-table/data-table.component';
import { HomeComponent } from './Component/home/home.component';
import { LayersComponent } from './Component/layers/layers.component';
import { environment } from 'src/environments/environment';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { NotallowedComponent } from './Component/notallowed/notallowed.component';
import { TableComponent } from './Component/table/table.component';
import { SchemaComponent } from './Component/schema/schema.component';
const resources = environment.resources;
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Home',
      breadcrumb: [
        {
          label: '',
          url: '',
        },
      ],
    },
    canActivate: [OktaAuthGuard],
  },
  {
    path: 'access_denied',
    component: NotallowedComponent,
    canActivate: [OktaAuthGuard],
  },
  {
    path: 'data',
    component: DataTableComponent,
    data: {
      title: 'Data',
      breadcrumb: [
        {
          label: 'Home',
          url: '/home/',
        },
        {
          label: 'Data',
          url: '',
        },
      ],
    },
    canActivate: [OktaAuthGuard],
  },

  {
    path: 'layer',
    component: LayersComponent,
    data: {
      title: 'Layer',
      breadcrumb: [
        {
          label: 'Home',
          url: '/home/',
        },
        {
          label: 'Data',
          url: 'data',
        },
        {
          label: 'Layer',
          url: '',
        },
      ],
    },
    canActivate: [OktaAuthGuard],
  },
  {
    path: 'table',
    component: TableComponent,
    data: {
      title: 'table',
      breadcrumb: [
        {
          label: 'Home',
          url: '/home/',
        },
        {
          label: 'Data',
          url: 'data',
        },
        {
          label: 'Layer',
          url: 'layer',
        },
        {
          label: 'table',
          url: '',
        },
      ],
    },
    canActivate: [OktaAuthGuard],
  },
  {
    path: 'schema',
    component: SchemaComponent,
    data: {
      title: 'schema',
      breadcrumb: [
        {
          label: 'Home',
          url: '/home/',
        },
        {
          label: 'Data',
          url: 'data',
        },
        {
          label: 'Layer',
          url: 'layer',
        },
        {
          label: 'table',
          url: 'table',
        },
        {
          label: 'schema',
          url: '',
        },
      ],
    },
    canActivate: [OktaAuthGuard],
  },
  { path: 'callback', component: OktaCallbackComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  static component = [HomeComponent, DataTableComponent, LayersComponent];
}
