import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICustomerDetail } from '../customers.model';

@Component({
  selector: 'edit-customer-detail',
  templateUrl: './edit-customer-detail.component.html',
  styleUrls: ['./edit-customer-detail.component.scss']
})

export class EditCustomerDetailComponent {
  public customerForm: FormGroup;
  url: string = '';

  constructor(
    private readonly fb: FormBuilder,
    public readonly dialogRef: MatDialogRef<EditCustomerDetailComponent, ICustomerDetail>,
    @Inject(MAT_DIALOG_DATA) public customerDetail: ICustomerDetail
    ) {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: [null, Validators.required],
    });
  }

  ngOnInit() {
    console.log('this.customerDetail: ', this.customerDetail);
    this.url = this.customerDetail.image;
    this.customerForm.patchValue({name: this.customerDetail.name, description: this.customerDetail.description, image: this.url})
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        this.customerForm.patchValue({image: this.url});
      }
    }
  }

  save(){
      this.close(this.customerForm.value);
  }

  close(customerDetail?: ICustomerDetail){
    document.getElementsByClassName("animate__animated")[0].classList.remove("animate__slideInDown");
    document.getElementsByClassName("animate__animated")[0].classList.add("animate__slideOutDown");
    setTimeout(()=>{
      if (customerDetail){
        this.dialogRef.close(customerDetail);
      }else{
        this.dialogRef.close();
      }
    }, 1000);
  }

}
