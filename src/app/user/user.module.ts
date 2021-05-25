import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ListComponent } from './list/list.component';
import { MatDialogModule } from "@angular/material/dialog";
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from "./user.service";
import { PipeModule } from '../pipemodule/pipe.module';
@NgModule({
  declarations: [ListComponent, FormComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    ToastrModule,
    HttpClientModule,
    PipeModule,
    FormsModule
  ],
  providers:[UserService]
})
export class UserModule { }
