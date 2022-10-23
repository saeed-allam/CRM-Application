import { Component } from '@angular/core';
import { FixedService } from '../../utils/fixed.service';
import { GlobalService } from '../../utils/global.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    constructor(public fixed: FixedService, public global: GlobalService) {}
}
