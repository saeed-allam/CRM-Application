import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerOperationComponent } from './customer-operation/customer-operation.component';
import { CustomerService } from './customer.service';
import { CoreModule } from '../core/core.module';
import { CustomerSharedComponent } from './customer-shared/customer-shared.component';


@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerOperationComponent,
    CustomerSharedComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,CoreModule.forRoot()
  ],
  providers:[CustomerService],
  exports:[CustomerSharedComponent]
})
export class CustomerModule { }
