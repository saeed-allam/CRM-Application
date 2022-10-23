import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FixedService } from './fixed.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { ResponseEnum } from '../enums/response.enum';
import { BehaviorSubject, forkJoin } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({ providedIn: 'root' })
export class GlobalService {
  toastrOptions: any;
  appLangChanged: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private translate: TranslateService,
    private toastrSer: ToastrService,
    private localStorage: LocalStorage,
    public localeService: BsLocaleService,
    public fixed: FixedService,
    private router: Router,
    private titleSer: Title
  ) {
    this.localStorage.getItem<any>('appLang').subscribe(data => {
      this.fixed.activeLang = data === null ? this.fixed.appLanguages[1] : data;
      this.themeSettings(this.fixed.activeLang);
      this.setLang(this.fixed.activeLang.code);
      this.generateDeleteSwalConfig();
    });
  }

  setLang(lang) {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('en');
    this.translate.use(lang);
  }

  themeSettings(appLang) {
    this.fixed.activeLang = appLang;
    const html = document.getElementsByTagName('html')[0] as HTMLHtmlElement;
    html.setAttribute('lang', this.fixed.activeLang.code);
    html.setAttribute('dir', this.fixed.activeLang.dir);
    html.setAttribute('direction', this.fixed.activeLang.dir);
    html.setAttribute('style', 'direction: ' + this.fixed.activeLang.dir);

    const body = document.getElementsByTagName('body')[0] as HTMLBodyElement;
    body.setAttribute('dir', appLang.dir);
    body.dir = appLang.dir;
    if (appLang.dir == 'rtl') {
      body.classList.add('rtl');
    } else {
      body.classList.remove('rtl');
    }
    this.titleSer.setTitle(appLang.title);
    this.setLang(this.fixed.activeLang.code);
    this.localeService.use(this.fixed.activeLang.code);
    this.appLangChanged.next(this.fixed.activeLang);
    this.generateDeleteSwalConfig();
  }

  generateDeleteSwalConfig() {
    forkJoin([this.translate.get('Form.DeleteConfirmMessage'), this.translate.get('Form.Confirm'), this.translate.get('Form.Cancel')]).subscribe(results => {
      this.fixed.deleteSwalConfig = {
        icon: 'error',
        title: results[0],
        confirmButtonText: results[1],
        cancelButtonText: results[2],
        confirmButtonColor: '#d33',
        focusCancel: true,
        focusConfirm: false,
        showCloseButton: false,
        showCancelButton: true,
        showConfirmButton: true,
      };
    });
  }

  notificationMessage(type: ResponseEnum, title?: string, message?: string, err?: any, position?) {
    if (err != null && err.status === 403) return;
    this.toastrOptions = {
      positionClass: position == null ? (this.fixed.activeLang.isRTL ? 'toast-top-left' : 'toast-top-right') : position,
      progressBar: true,
      progressAnimation: 'increasing',
      closeButton: true,
    };
    let severity;
    if (type === ResponseEnum.Success) {
      forkJoin([this.translate.get('Message.Successful'), this.translate.get('Message.SuccessfulText')]).subscribe(results => {
        title = title ? title : results[0];
        message = message ? message : results[1];
        severity = 'toast-success';
        this.toastrSer.show(message, title, this.toastrOptions, severity);
      });
    } else if (type === ResponseEnum.InProgress) {
      forkJoin([this.translate.get('Message.InProgress'), this.translate.get('Message.InProgressText')]).subscribe(results => {
        title = title ? title : results[0];
        message = message ? message : results[1];
        severity = 'toast-info';
        this.toastrSer.show(message, title, this.toastrOptions, severity);
      });
    } else if (type === ResponseEnum.ValidationError) {
      forkJoin([this.translate.get('Message.Warning'), this.translate.get('Message.WarningText')]).subscribe(results => {
        title = title ? title : results[0];
        message = message ? message : results[1];
        severity = 'toast-warning';
        this.toastrSer.show(message, title, this.toastrOptions, severity);
      });
    } else if (type === ResponseEnum.Failed) {
      forkJoin([this.translate.get('Message.Unsuccessful'), this.translate.get('Message.UnsuccessfulText')]).subscribe(results => {
        title = title ? title : results[0];
        message = message ? message : results[1];
        severity = 'toast-error';
        this.toastrSer.show(message, title, this.toastrOptions, severity);
      });
    }
  }

  loading(type?: boolean, url?) {
    const check = url != null ? this.fixed.requestWithoutLoader.filter(s => s === url.split('?')[0])[0] : null;
    if (check != null) {
      return;
    }
    const body = document.getElementsByTagName('body')[0] as HTMLBodyElement;
    type === true ? body.classList.add('page-loading') : body.classList.remove('page-loading');
  }

  toTop(url?) {
    const check = url != null ? this.fixed.routingWithoutTop.filter(s => s === url.split(';')[0])[0] : null;
    if (check != null) {
      return;
    }
    const top = document.getElementById('kt_scrolltop') as HTMLSpanElement;
    if (top != null) {
      top.click();
    }
  }

  closePage(url?) {
    forkJoin([this.translate.get('Message.Warning'), this.translate.get('Message.OperationError')]).subscribe(results => {
      const model = {
        type: 'error',
        title: results[0],
        html: `<span class='red-custom text-bold'>` + results[1] + `</span>`,
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
      };
      Swal.fire(model);
    });
    setTimeout(() => {
      Swal.close();
      if (url != null) {
        this.router.navigate([url]);
      }
    }, 5000);
  }

  formatDateTime(date: Date) {
    if (date == null || typeof date === 'string') return date;
    const year = String(date.getFullYear()).length === 1 ? '0' + date.getFullYear() : date.getFullYear();
    const month = String(date.getMonth() + 1).length === 1 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = String(date.getDate()).length === 1 ? '0' + date.getDate() : date.getDate();
    const hour = String(date.getHours()).length === 1 ? '0' + date.getHours() : date.getHours();
    const min = String(date.getMinutes()).length === 1 ? '0' + date.getMinutes() : date.getMinutes();
    return year + '-' + month + '-' + day + 'T' + hour + ':' + min + ':00';
  }

  formatDate(date: Date) {
    if (date == null || typeof date === 'string') return date;
    const year = String(date.getFullYear()).length === 1 ? '0' + date.getFullYear() : date.getFullYear();
    const month = String(date.getMonth() + 1).length === 1 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = String(date.getDate()).length === 1 ? '0' + date.getDate() : date.getDate();
    return year + '-' + month + '-' + day;
  }

  saveParamInUrl(pageUrl, paramsUrl, obj) {
    const key = Object.keys(obj)[0];
    let value = obj[key];
    if (Array.isArray(obj[key]) && obj[key].length == 0) {
      value = null;
      obj[key] = null;
    }
    if (paramsUrl[key]) delete paramsUrl[key];
    if (value !== null && value !== '' && value !== 'NaN-NaN-NaN') paramsUrl = Object.assign(obj, paramsUrl);
    this.router.navigate([pageUrl, paramsUrl]);
    return paramsUrl;
  }

  generateCode(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  removeSpacesinFormControl(f) {
    const keys = Object.keys(f.controls);
    keys.forEach(key => {
      const value = f.controls[key].value;
      if (typeof value == 'string' && value != null) {
        f.controls[key].setValue(f.controls[key].value.trim());
      }
      if (/^ *$/.test(f.controls[key].value)) {
        f.controls[key].setValue(null);
      }
    });
  }
  customSearchFn(term: string, item?: any) {
    const customSearchFnKeys = ['nameEn', 'nameAr', 'fullName', 'name', 'valueAr', 'valueEn'];
    for (let i = 0; i < customSearchFnKeys.length; i++) {
      if (item[customSearchFnKeys[i]] != null && item[customSearchFnKeys[i]].includes(term)) {
        return item;
      } else if (item[customSearchFnKeys[i]] != null && item[customSearchFnKeys[i]].toLowerCase().includes(term.toLowerCase())) {
        return item;
      }
    }
    return null;
  }
}
