import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorService } from '../services/error.service';
import { VMService } from '../services/vm.service';

@Component({
  selector: 'app-create-vm',
  templateUrl: './create-vm.component.html',
  styleUrls: ['./create-vm.component.scss'],
  providers: [
    VMService,
    ErrorService
  ]
})
export class CreateVmComponent implements OnInit {
  name: string = '';
  cloud: string = '';
  os: string = '';
  type: string = '';
  vmData: any = [];
  cloudType: string;
  constructor(
    public dialogRef: MatDialogRef<CreateVmComponent>,
    public vmService : VMService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}
  createVm() {
    this.vmData.push(this.name, this.cloud, this.os, this.type);
    this.vmService
    .CreateVm(this.name, this.cloud, this.os, this.type)
    .subscribe(vmdata => this.vmData.push(vmdata));
    this.closeDialog();
  }



  closeDialog() {
    this.dialogRef.close({ vmdata: this.vmData });
  }
}
