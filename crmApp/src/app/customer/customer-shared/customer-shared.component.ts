import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FixedService } from 'src/app/core/utils/fixed.service';
import { GlobalService } from 'src/app/core/utils/global.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-shared',
  templateUrl: './customer-shared.component.html',
})
export class CustomerSharedComponent implements OnChanges {
  @Input() showError: any;
  @Input() selectedValue: any;
  @Output() selectedValueChanges = new EventEmitter<any>();
  customerId = new FormControl(null);

  constructor(
    public fixed: FixedService,
    public global: GlobalService,
    public customerSer: CustomerService,
  ) {
    this.customerSer.getallActive();
   }


  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (
      changes.selectedValue != undefined &&
      changes.selectedValue.currentValue !== changes.selectedValue.previousValue
    ) {
      this.customerId.setValue(this.selectedValue);
    }
  }

  onSelect() {
    const obj = this.customerSer.list.filter(s=>s.customerId == this.customerId.value)[0];
    this.selectedValueChanges.emit(obj);
  }
}
