import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubheaderModel } from 'src/app/core/model/subheader.model';
import { FixedService } from 'src/app/core/utils/fixed.service';
import { GlobalService } from 'src/app/core/utils/global.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
})
export class CustomerListComponent implements OnInit, OnDestroy {
  search = new FormControl();
  constructor(
    public fixed: FixedService,
    public global: GlobalService,
    public customerSer: CustomerService,
    public router: Router
  ) {
    this.customerSer.getAll();
  }

  ngOnInit(): void {
    this.fixed.subheader = new SubheaderModel(true, [{ name: 'Customer', url: './customer/list' }]);
  }
  ngOnDestroy(): void {
    this.fixed.subheader = null;
  }
}
