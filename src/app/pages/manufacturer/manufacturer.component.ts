import { Component, OnInit } from '@angular/core';
import { ManufacturerService } from '../../services/manufacturer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit {
  manufacturers: any = [];
  name: any = "";
  description: any = "";
  address: any = "";
  phone: any = "";
  id: any = "";
  update: any = false;

  constructor(public manufacturerService: ManufacturerService, private spinner: NgxSpinnerService, public router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.manufacturerService.getManufacturer().then(response => {
      this.spinner.hide();
      let data: any = response;
      if (data.data) {
        this.manufacturers = data.data;
        console.log(this.manufacturers);
      }
    }, err => {

    })
  }

  addCustomer() {
    this.spinner.show();
    let params = {
      name: this.name,
      description: this.description,
      address: this.address,
      phone: this.phone,
      created_by: 1,
      updated_by: 1
    }
    this.manufacturerService.addManufacturer(params).then(response => {
      let data: any = response;
      if (data.data) {
        this.name = '';
        this.description = '';
        this.address = '';
        this.phone = '';
        swal({
          type: 'success',
          title: 'Success!',
          text: 'close',
        });
        this.ngOnInit();
        this.spinner.hide();
      } else {

        this.spinner.hide();
        swal({
          type: 'warning',
          title: 'Error!',
          text: 'close',
        });


      }
    })
  }

  deleteFile(id) {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.manufacturerService.deleteManufacturer(id).then(response => {
          let data: any = response;
          if (data) {

            swal({
              type: 'success',
              title: 'Deleted!',
              text: 'close',
            });
            this.ngOnInit();
            this.spinner.hide();
          } else {

            this.spinner.hide();
            swal({
              type: 'warning',
              title: 'Error!',
              text: 'close',
            });


          }
        })

      }
    })

  }

  updateFile() {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.value) {
        let params = {
          name: this.name,
          description: this.description,
          address: this.address,
          phone: this.phone,
          created_by: 1,
          updated_by: 1
        }
        this.manufacturerService.updateManufacturer(this.id, params).then(response => {
          let data: any = response;
          if (data.data) {
            this.id = '';
            this.name = '';
            this.description = '';
            this.address = '';
            this.phone = '';
            this.update = false;

            swal({
              type: 'success',
              title: 'Updated!',
              text: 'close',
            });
            this.ngOnInit();
            this.spinner.hide();
          } else {

            this.spinner.hide();
            swal({
              type: 'warning',
              title: 'Error!',
              text: 'close',
            });


          }
        })
      }
    })
  }

  toUpdate(manufacturer) {
    this.id = manufacturer.id;
    this.name = manufacturer.name;
    this.description = manufacturer.description;
    this.address = manufacturer.address;
    this.phone = manufacturer.phone;
    this.update = true;
  }

  clear() {
    this.name='';
    this.description = '';
    this.address = '';
    this.phone = '';
  }
  cancel() {
    this.id = '';
    this.name = '';
    this.description = '';
    this.address = '';
    this.phone = '';
    this.update = false;
  }

}
