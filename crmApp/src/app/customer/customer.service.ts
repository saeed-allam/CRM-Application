import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ResponseEnum } from '../core/enums/response.enum';
import { BaseService } from '../core/utils/Base.service';

@Injectable()
export class CustomerService extends BaseService {
  listPage = '/customer/list';
  operationPage = '/customer/operation/';
  url = 'Customer/';
  id = 'customerId';
  deactive(id) {
    Swal.fire('Confirm Message').then(result => {
      if (result.value) {
        this.http.delete(this.url + 'Deactivate/' + id).subscribe({
          next: (response: any) => {
            this.global.notificationMessage(ResponseEnum.Success);
            this.getAll();
          },
          error: err => {
            this.global.notificationMessage(ResponseEnum.Failed, null, null, err);
          },
        });
      }
    });
  }
  getallActive() {
    if (!this.requestSent) {
      this.requestSent = true;
      this.list = undefined;
      this.http.get(this.url + 'GetAllActive').subscribe({
        next: (response: any) => {
          response.forEach(element => {
            element.name = element.firstName + ' ' + element.lastName;
          });      
          this.list = response;
          this.requestSent = false;
        },
        error: err => {
          this.global.notificationMessage(ResponseEnum.Failed, null, null, err);
          this.requestSent = false;
        },
      });
    }
  }
  getAll() {
    if (!this.requestSent) {
      this.requestSent = true;
      this.list = undefined;
      this.http.get(this.url + 'GetAll').subscribe({
        next: (response: any) => {
            response.forEach(element => {
              element.name = element.firstName + ' ' + element.lastName;
            });     
          this.list = response;
          this.requestSent = false;
        },
        error: err => {
          this.global.notificationMessage(ResponseEnum.Failed, null, null, err);
          this.requestSent = false;
        },
      });
    }
  }
}
