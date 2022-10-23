import { Injectable } from '@angular/core';
import { SubheaderModel } from 'src/app/core/model/subheader.model';
import { SystemConfigModel } from 'src/app/core/model/system-config.model';

@Injectable()
export class FixedService {
  public tokenRequestSent = false;
  public activeLang: any = {};
  public sysConfig = new SystemConfigModel();
  public appLanguages: any = [];
  public themeLoaded = false;
  public currentURL: string;
  public requestWithoutLoader = [];
  public subheader = new SubheaderModel();
  public allowAnonymous = ['token', 'Token/Refresh', 'User/Logout'];
  public routingWithoutTop: any = [];
  public deleteSwalConfig: any = {};
  public datePickerConfig = {
    dateInputFormat: 'YYYY/MM/DD',
    containerClass: 'theme-dark-blue',
    showWeekNumbers: false,
  };
  public dateTimePickerConfig = {
    dateInputFormat: 'YYYY/MM/DD , hh:mm a',
    containerClass: 'theme-dark-blue',
    showWeekNumbers: false,
  };

  public recordPerPage = [
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '30', value: 30 },
    { label: '40', value: 40 },
    { label: '50', value: 50 },
    { label: '100', value: 100 },
    { label: '150', value: 150 },
  ];

  constructor() {
    this.initialAppLang();
  }

  initialAppLang() {
    this.appLanguages = [
      {
        languageId: 1,
        isRTL: true,
        code: 'ar',
        name: 'عربي',
        dir: 'rtl',
        icon: 'flag-icon-sa',
        title: 'مدير هيلثي بلس',
      },
      {
        languageId: 2,
        isRTL: false,
        code: 'en',
        name: 'English',
        dir: 'ltr',
        icon: 'flag-icon-uk',
        title: 'Healthy Plus Manager',
      },
    ];
  }
}
