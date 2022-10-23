import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductOperationComponent } from './product-operation/product-operation.component';

const routes: Routes = [
  { path: 'list', component: ProductListComponent },
  { path: 'operation', component: ProductOperationComponent },
  { path: 'operation/:id', component: ProductOperationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
