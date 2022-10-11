import { Component, Inject } from '@angular/core';
import { VMService } from '../services/vm.service';
import { HttpClient } from '@angular/common/http';
import { VM } from '../models/vm';
import { Template } from '../models/template';
import { ErrorService } from '../services/error.service';
import {MatSelectModule, MatSelect} from '@angular/material/select';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import {CreateVmComponent} from '../dialogs/create-vm.component';
import { AzureVm } from '../models/azurevm';
import { combineLatest, forkJoin, map } from 'rxjs';
import { CreatevmDialogComponent } from './createvm-dialog.component';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer.service';
@
Component({
selector: 'home-component',
templateUrl: './home.component.html',
styleUrls: ['./home.component.css'],
providers: [
  VMService,
  ErrorService
]
})
export class HomeComponent {


  public instances: VM[];
  public customers: Customer[];
  public azvms: AzureVm[];
  public templates: Template[];
  users: any[] = [];
  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
    aliases: this.fb.array([
      this.fb.control('')
    ])
  })
 /* displayedColumns: string[] = ['vmId', 'name', 'cloud', 'type', 'status', 'ipAddress'];*/
  constructor(
    http: HttpClient,
    public dialog: MatDialog,
    public vmService : VMService,
    public customerService : CustomerService,
    private fb: FormBuilder)
    {
    this.vmService.GetTemplates().subscribe(resultTemplates => {
      this.templates = resultTemplates;
    }, error => console.error(error));

    this.vmService.getAllVMs().subscribe(result => {
      this.instances = result;
    }, error => console.error(error));

  }

  selectedTemplate = 'option2';


  public CreateVM() {
    this.dialog.open(CreateVmComponent);
    window.location.reload();
  }

  public CreateVMDialog() {
    this.dialog.open(CreatevmDialogComponent);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateVmComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogForm(): void {
    const dialogRef = this.dialog.open(CreatevmDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public CreateWindowsAD() {
    this.vmService.CreateWindowsAD().subscribe(result => {
      this.instances = result;
    }, error => console.error(error))
    window.location.reload();

  }

  public confirmStartVM(id: string, cloud: string, name: string) {
    this.vmService.StartInstance(id,cloud,name).subscribe(result => {
      this.instances = result;
    }, error => console.error(error))
    this.GetAllVMs();
  }

  public confirmStopVM(id: string, cloud: string, name: string) {
    this.vmService.StopInstance(id,cloud,name).subscribe(result => {
      this.instances = result;
    }, error => console.error(error))
    this.GetAllVMs();
  }



  public GetAllVMs() {
    this.vmService.getAllVMs().subscribe(result => {
      this.instances = result;
    }, error => console.error(error))
    window.location.reload();

  }


}



