import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICustomersList } from './customers.model';
import { ErrorService } from '../services/error.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CustomersService {

  constructor(private readonly http: HttpClient) { }
  getCustomers() {
    return this.http.get('../assets/customers.json');
  }

  getGroups() {
    return this.http.get('../assets/customer-detail.json');
  }

  getGroupDetail() {
    return this.http.get('../assets/group-detail.json');
  }

}
