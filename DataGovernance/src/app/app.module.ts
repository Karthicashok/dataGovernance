import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './Component/login/login.component';
import { HomeComponent } from './Component/home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DataTableComponent } from './Component/data-table/data-table.component';
import { DataTablesModule } from 'angular-datatables';
import { DataService } from './service/data.service';
import { LayersComponent } from './Component/layers/layers.component';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { TableComponent } from './Component/table/table.component';
import { SchemaComponent } from './Component/schema/schema.component';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { HeaderComponent } from './Component/header/header.component';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';
import { SidenavComponent } from './Component/sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { UpdateComponent } from './Component/update/update.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NotallowedComponent } from './Component/notallowed/notallowed.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { environment } from '../environments/environment';
console.log(window.location.origin + '/callback');
const oktaAuth = new OktaAuth(environment.oktaconfig);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DataTableComponent,
    LayersComponent,
    TableComponent,
    SchemaComponent,
    HeaderComponent,
    SidenavComponent,
    UpdateComponent,
    NotallowedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatInputModule,
    OktaAuthModule,
    NgDynamicBreadcrumbModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    FlexLayoutModule,
    MatTooltipModule,
  ],
  providers: [
    DataService,
    { provide: OKTA_CONFIG, useValue: { oktaAuth } },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
