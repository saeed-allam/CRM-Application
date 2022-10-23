import { Injectable } from '@angular/core';
import { BaseService } from '../core/utils/Base.service';

@Injectable()
export class OrderService extends BaseService{
  listPage = '/order/list';
  operationPage = '/order/operation/';
  url = 'Order/';
  id = 'orderId';
}
