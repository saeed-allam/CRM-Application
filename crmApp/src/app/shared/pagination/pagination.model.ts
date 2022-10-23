import { ConstantsEnum } from 'src/app/core/enums/constants.enum';

export class PaginationModel {
    constructor(
        public currentPage: number = ConstantsEnum.Page,
        public lastPage: number = null,
        public recordPerPage: number = ConstantsEnum.RecordPerPage,
        public recordPerPageName: string = "'" + ConstantsEnum.RecordPerPage + "'",
        public total: number = null,
        public list: any = [],
        public from: number = 1,
        public to: number = 1,
    ) {}
}
