import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IGroupDetail } from '../customers.model';

@Component({
  selector: 'edit-group-detail',
  templateUrl: './edit-group-detail.component.html',
  styleUrls: ['./edit-group-detail.component.scss']
})

export class EditGroupDetailComponent {
  public groupForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    public readonly dialogRef: MatDialogRef<EditGroupDetailComponent, IGroupDetail>,
    @Inject(MAT_DIALOG_DATA) public groupDetail: IGroupDetail
    ) {
    this.groupForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    console.log('this.groupDetail: ', this.groupDetail);
    this.groupForm.patchValue({name: this.groupDetail.name, description: this.groupDetail.description})
  }

  save(){
      this.close(this.groupForm.value);
  }

  close(groupDetail?: IGroupDetail){
    document.getElementsByClassName("animate__animated")[0].classList.remove("animate__slideInDown");
    document.getElementsByClassName("animate__animated")[0].classList.add("animate__slideOutDown");
    setTimeout(()=>{
      if (groupDetail){
        this.dialogRef.close(groupDetail);
      }else{
        this.dialogRef.close();
      }
    }, 500);
  }

}
