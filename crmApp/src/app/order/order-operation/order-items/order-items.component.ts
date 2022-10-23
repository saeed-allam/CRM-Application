import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FixedService } from 'src/app/core/utils/fixed.service';
import { GlobalService } from 'src/app/core/utils/global.service';
import { ProductService } from 'src/app/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
})
export class OrderItemsComponent {
  orderItemForm: FormGroup;
  orderItem_Delete: any = [];
  @Input() orderItem: any = [];
  @Output() orderItemChanges = new EventEmitter<any>();
  submitted = false;
  orderItemlist = [];

  constructor(public fixed: FixedService, public global: GlobalService, private formBuilder: FormBuilder, public http: HttpClient,public productSer:ProductService) {
    this.initModel();
  }

  addRecord() {
    this.submitted = true;
    this.global.removeSpacesinFormControl(this.orderItemForm);
    if (this.orderItemForm.invalid) {
      return;
    } else {
      this.orderItem.push(this.orderItemForm.value);
      this.gridChange();
      this.initModel();
    }
  }

  get f() {
    return this.orderItemForm.controls;
  }

  removeItem(item, index) {
    Swal.fire(this.fixed.deleteSwalConfig).then(result => {
      if (result.value) {
        if (item.orderItemId != null) this.orderItem_Delete.push(item.orderItemId);
        this.orderItem.splice(index, 1);
        this.gridChange();
      }
    });
  }

  removeAll() {
    if (this.orderItem.length > 0) {
      Swal.fire(this.fixed.deleteSwalConfig).then(result => {
        if (result.value) {
          this.orderItem_Delete = this.orderItem
            .filter(s => s.orderItemId != null)
            .map(function (v) {
              return v.orderItemId;
            });
          this.orderItem = [];
          this.gridChange();
        }
      });
    }
  }

  initModel() {
    this.submitted = false;
    this.orderItemForm = this.formBuilder.group({
      orderItemId: [null, []],
      productId: [null, [Validators.required]],
      quantity: [1, [Validators.required]],
      orderLine: [null, [Validators.required]],
      taxAmount: [0, [Validators.required]],
      price: [null, [Validators.required]],
      total: [null, []],
    });
  }

  gridChange() {
    this.orderItemChanges.next({
      orderItem: this.orderItem,
      orderItem_Delete: this.orderItem_Delete,
    });
  }
}
