import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductOperationComponent } from './product-operation/product-operation.component';
import { CoreModule } from '../core/core.module';
import { ProductService } from './product.service';
import { ProductSharedComponent } from './product-shared/product-shared.component';

@NgModule({
  declarations: [ProductListComponent, ProductOperationComponent, ProductSharedComponent],
  imports: [CommonModule, ProductRoutingModule, CoreModule.forRoot()],
  providers: [ProductService],
exports:[ProductSharedComponent]
})
export class ProductModule {}