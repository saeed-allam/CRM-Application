import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderOperationComponent } from './order-operation/order-operation.component';
import { CoreModule } from '../core/core.module';
import { OrderService } from './order.service';
import { OrderItemsComponent } from './order-operation/order-items/order-items.component';
import { ProductModule } from '../product/product.module';
import { CustomerModule } from '../customer/customer.module';


@NgModule({
  declarations: [
    OrderListComponent,
    OrderOperationComponent,
    OrderItemsComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,CoreModule.forRoot(),ProductModule,CustomerModule
  ],
  providers:[OrderService]
})
export class OrderModule { }
