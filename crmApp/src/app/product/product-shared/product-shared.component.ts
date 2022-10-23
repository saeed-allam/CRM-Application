import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FixedService } from 'src/app/core/utils/fixed.service';
import { GlobalService } from 'src/app/core/utils/global.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-shared',
  templateUrl: './product-shared.component.html'
})
export class ProductSharedComponent implements OnChanges {
  @Input() showError: any;
  @Input() selectedValue: any;
  @Output() selectedValueChanges = new EventEmitter<any>();
  productId = new FormControl(null);

  constructor(
    public fixed: FixedService,
    public global: GlobalService,
    public productSer: ProductService,
  ) {
    this.productSer.getAll();
   }


  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (
      changes.selectedValue != undefined &&
      changes.selectedValue.currentValue !== changes.selectedValue.previousValue
    ) {
      this.productId.setValue(this.selectedValue);
    }
  }

  onSelect() {
    const obj = this.productSer.list.filter(s=>s.productId == this.productId.value)[0];
    this.selectedValueChanges.emit(obj);
  }
}
