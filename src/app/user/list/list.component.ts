import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormComponent } from '../form/form.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  list = [];
  data = [];
  find: any;
  constructor(
    private dailog: MatDialog,
    private toaster: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getList();
  }
  getList() {
    this.userService.getList().subscribe(res => {
      this.list = res;
      this.data = res;
    })
  }
  search(event) {
    const data = this.data ? this.data.filter(item => item.name.search(new RegExp(event, 'i')) > -1) : [];
    if (data.length > 0) {
      this.list = data;
    }
  }
  sorting(event) {
    if (event === 'ase') {
      this.list = this.list.sort((a, b) =>
        (a['number'] || '').toString().localeCompare((b['number'] || '').toString())
      )
    }
    if (event === 'desc') {
      this.list = this.list.sort((a, b) =>
        (b['number'] || '').toString().localeCompare((a['number'] || '').toString())
      )
    }
  }

  add(index, type) {
    let value = {};
    if (type === 'edit') {
      value = {
        name: this.list[index].name,
        address: this.list[index].address,
        gender: this.list[index].gender,
        number: this.list[index].number,
        age: this.list[index].age
      }
    }
    const dailog = this.dailog.open(FormComponent, {
      data: value,
      width: '588px',
      autoFocus: false,
      disableClose: true
    })
    dailog.afterClosed().subscribe(res => {
      if (res) {
        if (type === 'add') { this.list.push(res); }
        if (type === 'edit') {
          this.list[index].name = res.name;
          this.list[index].address = res.address;
          this.list[index].gender = res.gender;
          this.list[index].number = res.number;
          this.list[index].age = res.age;
        }
      }
    })
  }
  delete(index) {
    var con = confirm('Are you sure want to delete ' + this.list[index].name + ' ?');
    if (con) {
      this.list.splice(index, 1)
      this.toaster.success('Item Delete')
    }
  }
}
