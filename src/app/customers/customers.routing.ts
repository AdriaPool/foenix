import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CustomersComponent } from './customers/customers.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';

export const customersRoutes: Routes = [
  { path: '', component: CustomersComponent },
  { path: 'customer-detail', component: CustomerDetailComponent },
  { path: 'group-detail', component: GroupDetailComponent },
];

@NgModule({
  imports: [],
  exports: [RouterModule]
})

export class CustomersRoutingModule { }
