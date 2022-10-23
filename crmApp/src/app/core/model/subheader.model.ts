export class SubheaderModel {
  constructor(public display: boolean = true, public data: any = [], public headerButtons: any = []) {}
}

export class HeaderButtonModel {
  constructor(
    public routerLink: string = '',
    public cssClass: string = '',
    public icon: string = '',
    public text: string = '',
    public partType: number = null,
    public permissionType: number = null
  ) {}
}
