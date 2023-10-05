import { Component, ViewChild } from "@angular/core";
import * as Highcharts from "highcharts";
import exporting from "highcharts/modules/exporting";
import { LinechartComponent } from "./linechart/linechart.component";

//exporting(Highcharts);

@Component({
  selector: "app-charts",
  templateUrl: "./charts.component.html",
  styleUrls: ["./charts.component.scss"],
})
export class ChartsComponent {
  // @ViewChild(LinechartComponent) lineChart!:LinechartComponent ;
  Highcharts: typeof Highcharts = Highcharts;
  selectedValue : {label:string;value:string;} = {label: 'Success', value: 'success'}
  handleChartChnage(value: {label:string; value:string;}){
    this.selectedValue = value;
  }
  // handleClick() {
  //   //Highcharts.charts.
  //   this.lineChart.handleExport()
  // }
}
