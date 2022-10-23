import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpClient,
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { tap, catchError } from 'rxjs/operators';
import { GlobalService } from './global.service';
import { FixedService } from './fixed.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, throwError, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Interceptor implements HttpInterceptor {
    private newToken = '';

    constructor(
        private http: HttpClient,
        private cookieSer: CookieService,
        private translate: TranslateService,
        public fixed: FixedService,
        public global: GlobalService,
    ) {}

    private applyCredentials = req => {
        return req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + this.newToken),
        });
    };

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const allowAnonymous = this.fixed.allowAnonymous.filter(s => s === req.url.split('?')[0])[0];
        if (req.url.indexOf('assets') > -1 || req.url.indexOf('.json') > -1) {
            return next.handle(this.applyCredentials(req)).pipe(
                catchError(error => {
                    return throwError(error);
                }),
                tap(
                    event => {},
                    err => {},
                ),
            );
        } else{
            req = req.clone({ url: this.fixed.sysConfig.serverUrl + req.url });
            return next.handle(req).pipe(
                catchError(error => {
                    return throwError(error);
                }),
                tap(
                    event => {},
                    err => {},
                ),
            );
        }
    }
}
