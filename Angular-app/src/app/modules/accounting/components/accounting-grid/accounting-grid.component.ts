import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Guid } from 'typescript-guid';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

import { AccountingGridRecord } from "../../models/accounting-grid-record";
import { AddRange, SetActive } from 'app/modules/shared/store/actions/accounting.actions';
import { AccountingState } from 'app/modules/shared/store/states/accounting.state';

@Component({
    selector: 'accounting-grid',
    templateUrl: './accounting-grid.component.html',
    styleUrls: ['./accounting-grid.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountingGridComponent implements OnInit {

    @Select(AccountingState.getAccountingRecords) accountingRecords$!: Observable<AccountingGridRecord[]>;

    public ELEMENT_DATA: AccountingGridRecord[] = [
        {
            id: Guid.create(),
            date: new Date(2022, 24, 4),
            contractor: 'Перевозчик: Такси',
            category: 'Транспорт: Такси',
            Income: 0,
            expenditure: 0.35,
            balance: 0.35,
            comment: 'comment'
        },
        {
            id: Guid.create(),
            date: new Date(2022, 28, 4),
            contractor: 'Перевозчик: Такси',
            category: 'Транспорт: Общественный транспорт',
            Income: 0,
            expenditure: 0.35,
            balance: 0.35,
            comment: 'long long comment very long long long'
        },
        {
            id: Guid.create(),
            date: new Date(2022, 29, 4),
            contractor: 'Перевозчик: Такси',
            category: 'Транспорт: Общественный транспорт',
            Income: 0,
            expenditure: 11000.35,
            balance: 1201030.35,
            comment: 'long long comment very long long long'
        },
        {
            id: Guid.create(),
            date: new Date(2022, 5, 5),
            contractor: 'Работа: GodelTech',
            category: 'Доход: Аванс',
            Income: 15864,
            expenditure: 0,
            balance: 1201030.35,
            comment: 'long long comment very long long long'
        },
    ];

    public displayedColumns: string[] = [
        'date',
        'contractor',
        'category',
        'Income',
        'expenditure',
        'balance',
        'comment'
    ];

    public dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    public clickedRows = new Set<AccountingGridRecord>();

    constructor(private store: Store) { }
    ngOnInit(): void {
        this.populateStore();
    }

    public populateStore(): void {
        this.store.dispatch(new AddRange(this.ELEMENT_DATA));
    }

    public selectRow(record: AccountingGridRecord): void {
        this.store.dispatch(new SetActive(record.id));
    }
}