import { Component, OnChanges, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { FixedService } from 'src/app/core/utils/fixed.service';
import { PaginationModel } from './pagination.model';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnChanges {
    @Input() total: number;
    @Input() scroll: string;
    @Input() recordPerPage: number;
    @Input() page: number;
    pagination: PaginationModel;
    @Output() changePagination = new EventEmitter<any>();

    constructor(public fixed: FixedService) {
        this.pagination = new PaginationModel();
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        this.pagination.total = this.total;
        this.pagination.recordPerPage = this.recordPerPage;
        this.pagination.recordPerPageName = this.recordPerPage == 0 ? 'Common.All' : this.recordPerPage.toString();
        this.pagination.currentPage = this.page;
        this.generateData();
    }

    generateData() {
        if (this.pagination.recordPerPage === 0) {
            this.pagination = {
                currentPage: 0,
                lastPage: 1,
                from: 1,
                to: this.total,
                list: [1],
                recordPerPageName: 'Common.All',
                total: this.total,
                recordPerPage: 0,
            };
        } else {
            this.pagination.recordPerPage = Number(this.pagination.recordPerPage);
            this.pagination.list = [];
            this.pagination.lastPage = this.pagination.total / this.pagination.recordPerPage;
            this.pagination.lastPage = Number.isInteger(this.pagination.lastPage)
                ? this.pagination.lastPage
                : Math.trunc(this.pagination.lastPage + 1);
            const start = this.pagination.currentPage < 3 ? 1 : this.pagination.currentPage - 2;
            let count = 1;
            for (let i = start; i <= this.pagination.lastPage && count <= 5; i++) {
                this.pagination.list.push(i);
                count++;
            }
            this.pagination.from = (this.pagination.currentPage - 1) * this.pagination.recordPerPage + 1;
            this.pagination.to = this.pagination.from + this.pagination.recordPerPage - 1;
            if (this.pagination.to > this.pagination.total) {
                this.pagination.to = this.pagination.total;
            }
        }
    }

    change(type, page?) {
        if (page > this.pagination.lastPage) return;
        if (page !== this.pagination.currentPage || type === 'recordPerPage') {
            switch (type) {
                case 'plus':
                    this.pagination.currentPage++;
                    break;
                case 'min':
                    this.pagination.currentPage--;
                    break;
                case 'last':
                    this.pagination.currentPage = this.pagination.lastPage;
                    break;
                case 'first':
                    this.pagination.currentPage = 1;
                    break;
                case 'list':
                    this.pagination.currentPage = page;
                    break;
                case 'recordPerPage':
                    this.pagination.currentPage = page;
                    break;
            }
            this.generateData();
            this.changePagination.emit(this.pagination);
        }
    }

    selectChange() {
        this.pagination.recordPerPageName = this.fixed.recordPerPage.filter(
            s => s.value == Number(this.pagination.recordPerPage),
        )[0].label;
        this.change('recordPerPage', 1);
    }
}
