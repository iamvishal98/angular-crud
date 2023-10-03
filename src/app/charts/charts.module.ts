import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarchartComponent } from './barchart/barchart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartsComponent } from './charts.component';
import { ChartRoutingModule } from './chart-routing.module';
import { PiechartComponent } from './piechart/piechart.component';


@NgModule({
  declarations: [
    BarchartComponent,
    ChartsComponent,
    PiechartComponent
  ],
  imports: [
    CommonModule,
    HighchartsChartModule,
    ChartRoutingModule,
  ]
})
export class ChartsModule { }
