import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarchartComponent } from './barchart/barchart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartsComponent } from './charts.component';
import { ChartRoutingModule } from './chart-routing.module';
import { PiechartComponent } from './piechart/piechart.component';
import { LinechartComponent } from './linechart/linechart.component';
import { AntdModule } from '../ant.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    BarchartComponent,
    ChartsComponent,
    PiechartComponent,
    LinechartComponent
  ],
  imports: [
    CommonModule,
    HighchartsChartModule,
    ChartRoutingModule,
    AntdModule,
    FormsModule
  ]
})
export class ChartsModule { }
