import { AppCoreModule } from './../core/core.module';
import { NgModule } from "@angular/core";

import {
    CurrencyRatesRoutingModule,
    CurrencyRatesDashboardComponent,
    CurrencyRatesGridComponent,
    CurrencyRatesLineChartComponent
} from "../currency-rates";
import { AppSharedModule } from '../shared';

@NgModule({
    declarations: [
        CurrencyRatesDashboardComponent,
        CurrencyRatesGridComponent,
        CurrencyRatesLineChartComponent,
    ],
    imports: [
        CurrencyRatesRoutingModule,
        AppSharedModule,
        AppCoreModule
    ],
    providers: [],
    bootstrap: [],
})
export class CurrencyRatesModule { }