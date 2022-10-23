import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubheaderModel } from 'src/app/core/model/subheader.model';
import { FixedService } from 'src/app/core/utils/fixed.service';
import { GlobalService } from 'src/app/core/utils/global.service';
import { CustomerService } from 'src/app/customer/customer.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html'
})
export class OrderListComponent implements OnInit , OnDestroy {
  search = new FormControl();
  constructor(
    public fixed: FixedService,
    public global: GlobalService,
    public customerSer: CustomerService,
    public orderSer: OrderService,
    public router: Router
  ) {
    this.orderSer.getAll();
    this.customerSer.getAll();
  }

  ngOnInit(): void {
    this.fixed.subheader = new SubheaderModel(true, [{ name: 'Order', url: './order/list' }]);
  }
  ngOnDestroy(): void {
    this.fixed.subheader = null;
  }
}
