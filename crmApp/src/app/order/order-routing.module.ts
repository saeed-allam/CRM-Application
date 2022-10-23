import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderOperationComponent } from './order-operation/order-operation.component';

const routes: Routes = [
  { path: 'list', component: OrderListComponent },
  { path: 'operation', component: OrderOperationComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
