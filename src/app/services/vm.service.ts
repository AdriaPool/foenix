
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VM } from '../models/vm';
import { Customer } from '../models/customer';
import { vmData } from '../models/vmData';
import { Template } from '../models/template';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { Observable } from 'rxjs';
import { AzureVm } from '../models/azurevm';
import { forkJoin } from 'rxjs';
@Injectable()
export class VMService {

  constructor(public http: HttpClient, public errorService: ErrorService, @Inject('BASE_URL') private baseUrl: string) {
  }

  public getAllVMs() {
    return this.http.get<VM[]>(this.baseUrl + 'getAllVms').pipe(
      catchError(this.errorService.handleError));
  }

  public StartInstance(id, cloud, name) {
    return this.http.put<any>(this.baseUrl + 'cloudvm/start/' + id +'/'+ cloud +'/'+ name, null).pipe(
      catchError(this.errorService.handleError));
  }

  public StopInstance(id, cloud, name) {
    return this.http.put<any>(this.baseUrl + 'cloudvm/stop/' + id +'/'+ cloud +'/'+ name, null).pipe(
      catchError(this.errorService.handleError));
  }

  public CreateWindowsAD() {
    return this.http.post<any>(this.baseUrl + 'stack', null).pipe(
      catchError(this.errorService.handleError));
  }

  public GetTemplates() {
    return this.http.get<Template[]>(this.baseUrl + 's3/buckets/templates').pipe(
      catchError(this.errorService.handleError));
  }

  public getAllAzVMs() {
    return this.http.get<VM[]>(this.baseUrl + 'azvm').pipe(
      catchError(this.errorService.handleError));
  }

  public CreateVm(name:string, cloud:string, os:string, type:string) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    return this.http.post<any>(this.baseUrl + 'api/Cloud/createVm/'+ name +'/'+ cloud +'/'+ os +'/'+ type, httpOptions).pipe(
      catchError(this.errorService.handleError));
  }

  public getAllCustomers() {
    return this.http.get<Customer[]>(this.baseUrl + 'api/Customer').pipe(
      catchError(this.errorService.handleError));
  }
}
