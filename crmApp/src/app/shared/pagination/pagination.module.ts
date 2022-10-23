import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { CoreModule } from '../../core/core.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
    declarations: [PaginationComponent],
    imports: [CommonModule, CoreModule.forRoot(), BsDropdownModule.forRoot()],
    exports: [PaginationComponent],
})
export class PaginationModule {}
