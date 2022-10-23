import { Component } from '@angular/core';
import { FixedService } from '../../utils/fixed.service';
import { GlobalService } from '../../utils/global.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
})
export class AsideComponent {
  navList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: 'fa-solid fa-house',
      routerLink: '/dashboard',
      children: [],
    },
    {
      id: 2,
      name: 'Customer',
      icon: 'fa-solid fa-user-tie',
      routerLink: '',
      children: [
        {
          name: 'NewCustomer',
          id: 1,
          icon: 'fa-solid fa-circle-plus',
          routerLink: '/customer/operation',
          children: [],
        },
        {
          name: 'CustomerList',
          id: 2,
          icon: 'fa-solid fa-list',
          routerLink: '/customer/list',
          children: [],
        },
      ],
    },
    {
      id: 3,
      name: 'Product',
      icon: 'fa-brands fa-product-hunt',
      routerLink: '',
      children: [
        {
          name: 'NewProduct',
          id: 1,
          icon: 'fa-solid fa-circle-plus',
          routerLink: '/product/operation',
          children: [],
        },
        {
          name: 'ProductList',
          id: 2,
          icon: 'fa-solid fa-list',
          routerLink: '/product/list',
          children: [],
        },
      ],
    },
    {
      id: 4,
      name: 'Order',
      icon: 'fa-sharp fa-solid fa-clipboard',
      routerLink: '',
      children: [
        {
          name: 'NewOrder',
          id: 1,
          icon: 'fa-solid fa-circle-plus',
          routerLink: '/order/operation',
          children: [],
        },
        {
          name: 'OrderList',
          id: 2,
          icon: 'fa-solid fa-list',
          routerLink: '/order/list',
          children: [],
        },
      ],
    },
  ];

  constructor(public fixed: FixedService, public global: GlobalService) {}
}
