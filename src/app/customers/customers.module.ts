import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EditCustomerDetailComponent } from './edit-customer-detail/edit-customer-detail.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomersComponent } from './customers/customers.component';
import { customersRoutes, CustomersRoutingModule } from './customers.routing';
import { MaterialExampleModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CustomersComponent, CustomerDetailComponent, EditCustomerDetailComponent],
  imports: [
    CustomersRoutingModule,
    CommonModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    RouterModule.forChild(customersRoutes)
   ]
})

export class CustomersModule { }
