import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerOperationComponent } from './customer-operation/customer-operation.component';

const routes: Routes = [
  { path: 'list', component: CustomerListComponent },
  { path: 'operation', component: CustomerOperationComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
