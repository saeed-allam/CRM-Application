import { Injectable } from '@angular/core';
import { BaseService } from '../core/utils/Base.service';

@Injectable()
export class ProductService extends BaseService{
  listPage = '/product/list';
  operationPage = '/product/operation/';
  url = 'Product/';
  id = 'productId';
}
