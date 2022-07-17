import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import referredEntities from '../app/Table_data.json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'data_governance';
  tabledata = referredEntities.referredEntities;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger | any;
  username!: Observable<string>;
  mailid!: Observable<string>;
  public isAuthenticated$!: Observable<boolean>;
  constructor(
    public _router: Router,
    private _oktaStateService: OktaAuthStateService,
    public dialog: MatDialog,
    @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth
  ) {}

  public ngOnInit(): void {
    
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
   
    this.username = this._oktaStateService.authState$.pipe(
      filter(
        (authState: AuthState) => !!authState && !!authState.isAuthenticated
      ),
      map((authState: AuthState) => authState.idToken?.claims.name ?? '')
    );
    this.mailid = this._oktaStateService.authState$.pipe(
      filter(
        (authState: AuthState) => !!authState && !!authState.isAuthenticated
      ),
      map(
        (authState: AuthState) =>
          authState.idToken?.claims.preferred_username ?? ''
      )
    );
    
  }
  public async signIn(): Promise<void> {
    await this._oktaAuth
      .signInWithRedirect()
      .then((_) => this._router.navigate(['/home']));
  }

  public async signOut(): Promise<void> {
    await this._oktaAuth.signOut();
  }
  gotohome() {
    if (this._router.url != "'home'") {
      localStorage.clear();
      this._router.navigateByUrl('home');
    }
  }
}
