import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VM } from '../models/vm';
import { Customer, ICustomersList } from '../models/customer';
import { vmData } from '../models/vmData';
import { Template } from '../models/template';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { Group } from '../models/group';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

constructor(public http: HttpClient) { }

public getAllCustomers() {
  return this.http.get<ICustomersList[]>(environment.baseUrl + 'api/Customer');
}

public getAllCustomersTwo() {
  return this.http.get<Customer[]>(environment.baseUrl + 'api/Customer');
}

public getAllGroupsForCustomer(id?: string) {
  return this.http.get<Group[]>(environment.baseUrl + 'api/Customer/' + id + '/' + 'groups');
}

public getCustomer(id: string) {
  return this.http.get<Customer[]>(environment.baseUrl + 'api/Customer' + id);
}

}


