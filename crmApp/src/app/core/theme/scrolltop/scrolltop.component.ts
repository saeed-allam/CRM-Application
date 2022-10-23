import { Component } from '@angular/core';
import { FixedService } from '../../utils/fixed.service';

@Component({
    selector: 'app-scrolltop',
    templateUrl: './scrolltop.component.html',
})
export class ScrolltopComponent {
    constructor(public fixed: FixedService) {}
}
