import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  formData: FormGroup;
  invalidForm = false;
  constructor(
    private dailog: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taoster : ToastrService
  ) { }


  ngOnInit(): void {
    this.formData = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [Validators.required, Validators.pattern('[0-9]{2}')]),
      gender: new FormControl(false, [Validators.required]),
      number: new FormControl(null,[Validators.required, Validators.pattern('[0-9]{10}')]),
      address: new FormControl(null, Validators.required)
    })
    if (this.data.name) {
       this.formData.setValue({
        name: this.data.name,
        address: this.data.address,
        gender: this.data.gender,
        number: this.data.number,
        age: this.data.age
      })
    }

  }
  close() {
    this.dailog.close();
  }
  setData(form) {
if(!form){
  this.invalidForm = true;
}
    if (form) {
      this.dailog.close(this.formData.value)
      this.taoster.success('data set in user list')
    }
  }
}
