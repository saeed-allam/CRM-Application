import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SystemConfigModel } from 'src/app/core/model/system-config.model';

@Injectable()
export class SystemConfigService {
    private sysConfig: SystemConfigModel;

    constructor(private http: HttpClient) {}

    public getSystemConfig(): SystemConfigModel {
        return this.sysConfig;
    }

    load() {
        return new Promise((resolve, reject) => {
            this.http.get('./system-config.json').subscribe(
                (response: SystemConfigModel) => {
                    if (response != null) {
                        this.sysConfig = response;
                    }
                    resolve(true);
                },
                error => {},
            );
        });
    }
}
