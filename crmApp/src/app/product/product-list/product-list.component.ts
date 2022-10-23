import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubheaderModel } from 'src/app/core/model/subheader.model';
import { FixedService } from 'src/app/core/utils/fixed.service';
import { GlobalService } from 'src/app/core/utils/global.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit, OnDestroy {
  search = new FormControl();
  constructor(
    public fixed: FixedService,
    public global: GlobalService,
    private activatedRoute: ActivatedRoute,
    public productSer: ProductService,
    public router: Router
  ) {
    this.productSer.getAll();
  }

  ngOnInit(): void {
    this.fixed.subheader = new SubheaderModel(true, [{ name: 'Product', url: './product/list' }]);
  }
  ngOnDestroy(): void {
    this.fixed.subheader = null;
  }
}
