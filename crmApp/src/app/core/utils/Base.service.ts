import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/core/utils/global.service';
import { FixedService } from 'src/app/core/utils/fixed.service';
import { ResponseEnum } from 'src/app/core/enums/response.enum';
@Injectable()
export class BaseService {
    list: any = [];
    orderList: any = [];
    requestSent = false;
    id: string;
    url: string;
    listPage: string;
    operationPage: string;
    constructor(
        public global: GlobalService,
        public http: HttpClient,
        public fixed: FixedService,
        public router: Router,
    ) {}

    operation(model: any): Observable<any> {
        return model[this.id] == null
            ? this.http.post(this.url +`Insert`, model)
            : this.http.put(this.url + `Edit`, model);
    }
    
    getById(id) {
        return this.http.get(this.url + 'GetById/' + id);
    }

    swalDelete(id, service?, fn?) {
        Swal.fire(this.fixed.deleteSwalConfig).then(result => {
            if (result.value) {
                this.http.delete(this.url+ 'Delete/' + id).subscribe({
                   next: (response: any) => {
                        this.global.notificationMessage(ResponseEnum.Success);
                        this.swalAction( service, fn);
                    },
                    error: err => {
                        this.global.notificationMessage(ResponseEnum.Failed, null, null, err);
                        this.global.loading(false);
                    },
            });
            }
        });
    }

    swalAction(service?, fn?) {
        this.global.loading(false);
        if (fn != null) fn();
        if (service != null) {
            service.reload();
            return;
        }
        if (this.listPage != null) this.router.navigate([this.listPage]);
    }

    reload() {
        this.requestSent = false;
        this.list = [];
    }
    getAll() {
        if (!this.requestSent) {
          this.requestSent = true;
          this.list = undefined;
          this.http.get(this.url + 'GetAll').subscribe({
            next: (response: any) => {
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
