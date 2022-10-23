import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseEnum } from 'src/app/core/enums/response.enum';
import { SubheaderModel } from 'src/app/core/model/subheader.model';
import { FixedService } from 'src/app/core/utils/fixed.service';
import { GlobalService } from 'src/app/core/utils/global.service';
import { SubSink } from 'subsink';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-operation',
  templateUrl: './order-operation.component.html'
})
export class OrderOperationComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  submitted = false;
  requestSent = false;
  orderForm: FormGroup;

  constructor(
    public fixed: FixedService,
    public global: GlobalService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public orderSer: OrderService,
    public router: Router
  ) {}

  ngOnInit() {
    this.submitted = false;
    this.requestSent = false;
    this.initialModel();
    const sub = this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.fixed.subheader = new SubheaderModel(true, [{ name: 'Order Department', url: this.orderSer.listPage }]);
      if (id == null) {
        this.fixed.subheader.data.push({
          name: 'Add Order',
          url: this.orderSer.operationPage,
        });
      } else {
        this.fixed.subheader.data.push({
          name: 'Edit Order',
          url: this.orderSer.operationPage + id,
        });
        this.f.orderId.setValue(Number(id));
        this.orderSer.getById(this.f.orderId.value);
      }
    });
    this.subs.add(sub);
  }
  initialModel() {
    this.orderForm = this.formBuilder.group({
      orderId: [null, []],
      status: [null, [Validators.required]],
      date: [null, [Validators.required]],
      customerId: [null, [Validators.required]],
      orderItem: [[], []],
      orderItem_Delete: [[], []]
    });
  }

  get f() {
    return this.orderForm.controls;
  }

  onSubmit() {
    debugger;
    if (!this.requestSent) {
      this.submitted = true;
      this.global.removeSpacesinFormControl(this.orderForm);
      if (this.orderForm.invalid) {
        return;
      } else {
        this.requestSent = true;
        let model = this.orderForm.value;
        const sub = this.orderSer.operation(model).subscribe({
          next: (response: any) => {
            this.global.notificationMessage(ResponseEnum.Success);
            this.requestSent = false;
            this.submitted = false;
            if (this.f.orderId.value == null) {
              this.router.navigate([this.orderSer.operationPage + response.orderId]);
            } else {
              this.orderForm.setValue(response);
            }
          },
          error: err => {
            this.global.notificationMessage(ResponseEnum.Failed, null, null, err);
            this.global.loading(false);
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
