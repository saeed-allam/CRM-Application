import { Component } from '@angular/core';
import { FixedService } from './core/utils/fixed.service';
import { SystemConfigService } from './core/utils/system-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(public fixed: FixedService, private configSer: SystemConfigService) {
    this.fixed.sysConfig = this.configSer.getSystemConfig();
}
}
