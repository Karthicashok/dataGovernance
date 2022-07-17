import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import Authorization from '../user.json';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  getdbData(dbpath: any) {
    // it will get the datas of the DbList
    let req = {
      limit: environment.limit,
      offset: environment.offset,
      path: dbpath,
    };
    return this.http.post(environment.api_base_url + 'getDbList', req);
  }
  gettableData(dbpath: any) {
    // it will get the datas of the DbList
    let req = {
      limit: environment.limit,
      offset: environment.offset,
      path: dbpath,
    };
    return this.http.post(environment.api_base_url + 'gettablename', req);
  }
  getAccounts() {
    // it will get the datas of the accounts
    let req = {
      limit: environment.limit,
      offset: environment.offset,
      entityType: environment.entityType,
    };
    return this.http.post(environment.api_base_url + 'getaccounts', req);
  }
  getlayers(layerpath: any) {
    // it will get the datas of the layers by passing its path as parameter
    let req = {
      limit: environment.limit,
      offset: environment.offset,
      path: layerpath,
    };
    return this.http.post(
      environment.api_base_url + 'getLayers?api-version=2021-05-01-preview',
      req
    );
  }
  getschemaList(path: any) {
    // it will get the datas of the schemas by passing its path as parameter
    let req = {
      limit: environment.limit,
      offset: environment.offset,
      path: path,
    };
    return this.http.post(
      environment.api_base_url + 'getschemas?api-version=2021-05-01-preview',
      req
    );
  }
  uploadschema(file: any) {
    let req = {
      limit: environment.limit,
      offset: environment.offset,
      file: file,
    };

    return this.http.post(
      environment.api_base_url + 'uploadcsv?api-version=2021-05-01-preview',
      req
    );
  }
  getToken() {
    return JSON.parse(localStorage.getItem('okta-token-storage')!).accessToken
      .accessToken;
  }
  getrole() {
    return Authorization.allowedUrls;
  }
  updateSchema(data: any) {
    return this.http.put(
      `http://localhost:3000/referredEntities/3b50d951-0e49-4853-a780-3ff6f6f60000`,
      data
    );
  }
}
