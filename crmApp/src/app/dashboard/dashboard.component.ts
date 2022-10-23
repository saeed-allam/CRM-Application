import { Component } from '@angular/core';
import { SubheaderModel } from '../core/model/subheader.model';
import { FixedService } from '../core/utils/fixed.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  constructor(public fixed: FixedService) {
    this.fixed.subheader = new SubheaderModel(false);
  }
}
