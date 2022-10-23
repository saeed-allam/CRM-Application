import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseEnum } from 'src/app/core/enums/response.enum';
import { SubheaderModel } from 'src/app/core/model/subheader.model';
import { FixedService } from 'src/app/core/utils/fixed.service';
import { GlobalService } from 'src/app/core/utils/global.service';
import { SubSink } from 'subsink';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-operation',
  templateUrl: './product-operation.component.html',
})
export class ProductOperationComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  submitted = false;
  requestSent = false;
  productForm: FormGroup;

  constructor(
    public fixed: FixedService,
    public global: GlobalService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public productSer: ProductService,
    public router: Router
  ) {}

  ngOnInit() {
    this.submitted = false;
    this.requestSent = false;
    this.initialModel();
    const sub = this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.fixed.subheader = new SubheaderModel(true, [{ name: 'Product Department', url: this.productSer.listPage }]);
      if (id == null) {
        this.fixed.subheader.data.push({
          name: 'Add Product',
          url: this.productSer.operationPage,
        });
      } else {
        this.fixed.subheader.data.push({
          name: 'Edit Product',
          url: this.productSer.operationPage + id,
        });
        this.f.productId.setValue(Number(id));
        this.productSer.getById(this.f.productId.value);
      }
    });
    this.subs.add(sub);
  }
  initialModel() {
    this.productForm = this.formBuilder.group({
      productId: [null, []],
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, []]
    });
  }

  get f() {
    return this.productForm.controls;
  }

  onSubmit() {
    if (!this.requestSent) {
      this.submitted = true;
      this.global.removeSpacesinFormControl(this.productForm);
      if (this.productForm.invalid) {
        return;
      } else {
        this.requestSent = true;
        let model = this.productForm.value;
        const sub = this.productSer.operation(model).subscribe({
          next: (response: any) => {
            this.global.notificationMessage(ResponseEnum.Success);
            this.requestSent = false;
            this.submitted = false;
            if (this.f.productId.value == null) {
              this.router.navigate([this.productSer.listPage]);
            } else {
              this.productForm.setValue(response);
            }
          },
          error: err => {
            this.global.notificationMessage(ResponseEnum.Failed, null, null, err);
            this.global.loading(false);
            this.requestSent = false;
            this.submitted = false;
          },
        });
        this.subs.add(sub);
      }
    }
  }
  ngOnDestroy(): void {
    this.fixed.subheader=null;
    this.subs.unsubscribe();
  }
}
