import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AwsComponent } from './aws/aws.component';
import { VMService } from './services/vm.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialExampleModule} from '../app/material.module';
import {CreateVmComponent} from '../app/dialogs/create-vm.component';
import { CustomerService } from './services/customer.service';
import { CustomersService } from './customers/customers.service';



@NgModule({


 declarations: [
    AwsComponent,
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    CreateVmComponent,
   ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialExampleModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter/:id', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'aws', component: AwsComponent },
      { path: 'customers',
      loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
    ]),
    BrowserAnimationsModule
  ],


providers: [
   { provide: 'BASE_URL', useFactory: getBaseUrl },
   VMService,
   CustomerService,
   CustomersService,
    ],
  bootstrap: [AppComponent,AwsComponent],
  entryComponents: [CreateVmComponent]
})
export class AppModule { }

export function getBaseUrl() {
  return 'https://localhost:44334/';
}
