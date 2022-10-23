import { NgModule, ModuleWithProviders, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FixedService } from './utils/fixed.service';
import { ValidatorService } from './utils/validator.service';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Interceptor } from './utils/interceptor.service';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { arLocale } from 'ngx-bootstrap/locale';
import '@angular/common/locales/global/ar-SA';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SystemConfigService } from 'src/app/core/utils/system-config.service';
import { FullLayoutComponent } from './theme/full-layout/full-layout.component';
import { AsideComponent } from './theme/aside/aside.component';
import { HeaderComponent } from './theme/header/header.component';
import { FilterByIdPipe } from './pipes/filter-by-id.pipe';
import { ScrolltopComponent } from './theme/scrolltop/scrolltop.component';

const fixed = new FixedService();
@NgModule({
  declarations: [
    FullLayoutComponent,
    AsideComponent,
    HeaderComponent,
    FilterPipe,
    FilterByIdPipe,
    ScrolltopComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgSelectModule,
    ToastrModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    OrderModule,
  ],
  exports: [
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule,
    BsDatepickerModule,
    TooltipModule,
    ModalModule,
    NgSelectModule,
    OrderModule,
    FullLayoutComponent,
    FilterPipe,
    FilterByIdPipe
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ar' },
    { provide: FixedService, useValue: fixed },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
    BsLocaleService,
    ValidatorService,
    SystemConfigService,
  ],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
    };
  }
}
defineLocale('ar', arLocale);
