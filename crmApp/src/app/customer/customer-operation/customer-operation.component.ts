import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseEnum } from 'src/app/core/enums/response.enum';
import { SubheaderModel } from 'src/app/core/model/subheader.model';
import { FixedService } from 'src/app/core/utils/fixed.service';
import { GlobalService } from 'src/app/core/utils/global.service';
import { SubSink } from 'subsink';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-operation',
  templateUrl: './customer-operation.component.html',
})
export class CustomerOperationComponent implements OnInit,OnDestroy {
  private subs = new SubSink();
  submitted = false;
  requestSent = false;
  customerForm: FormGroup;

  constructor(
    public fixed: FixedService,
    public global: GlobalService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public customerSer: CustomerService,
    public router: Router
  ) {}

  ngOnInit() {
    this.submitted = false;
    this.requestSent = false;
    this.initialModel();
    const sub = this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.fixed.subheader = new SubheaderModel(true, [{ name: 'Customer Department', url: this.customerSer.listPage }]);
      if (id == null) {
        this.fixed.subheader.data.push({
          name: 'Add Customer',
          url: this.customerSer.operationPage,
        });
      } else {
        this.fixed.subheader.data.push({
          name: 'Edit Customer',
          url: this.customerSer.operationPage + id,
        });
        this.f.customerId.setValue(Number(id));
        this.customerSer.getById(this.f.customerId.value);
      }
    });
    this.subs.add(sub);
  }
  initialModel() {
    this.customerForm = this.formBuilder.group({
      customerId: [null, []],
      code: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, []],
      isActive: [true, []],
    });
  }

  get f() {
    return this.customerForm.controls;
  }

  onSubmit() {
    if (!this.requestSent) {
      this.submitted = true;
      this.global.removeSpacesinFormControl(this.customerForm);
      if (this.customerForm.invalid) {
        return;
      } else {
        this.requestSent = true;
        this.global.loading(true);
        let model = this.customerForm.value;
        const sub = this.customerSer.operation(model).subscribe({
          next: (response: any) => {
            this.global.notificationMessage(ResponseEnum.Success);
            this.requestSent = false;
            this.submitted = false;
            if (this.f.customerId.value == null) {
              this.router.navigate([this.customerSer.listPage]);
            } else {
              this.customerForm.setValue(response);
            }
          },
          error: err => {
            this.global.notificationMessage(ResponseEnum.Failed, null, null, err);
            this.requestSent = false;
            this.submitted = false;
          },
        });
        this.subs.add(sub);
      }
    }
  }
  ngOnDestroy(): void {
    this.fixed.subheader=null;
    this.subs.unsubscribe();
  }
}
