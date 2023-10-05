import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  AfterContentChecked,
} from "@angular/core";
import * as Highcharts from "highcharts";
import chartdata from "../../../assets/json/chartsData.json";
import { ISelectOptions, ISeriesData } from "src/app/Interface";
import {
  setChartOptions,
  setData,
  setXCoordinates,
} from "src/assets/utils/helpers";
import { ChartOptionsFunctionKey } from "../charts.enum";

@Component({
  selector: "app-barchart",
  templateUrl: "./barchart.component.html",
  styleUrls: ["./barchart.component.scss"],
})
export class BarchartComponent
  implements OnInit, OnChanges, AfterContentChecked
{
  constructor(private cdref: ChangeDetectorRef) {}
  Highcharts: typeof Highcharts = Highcharts;
  data: ISeriesData[] = [];
  dates: string[] = [];
  chartInstance!: Highcharts.Chart;
  @Input() selectedValue: ISelectOptions = {
    label: "Success",
    value: "success",
  };

  optionList = [
    { label: "Success", value: "success" },
    { label: "All", value: "all" },
  ];
  compareFn = (o1: any, o2: any): boolean =>
    o1 && o2 ? o1.value === o2.value : o1 === o2;
  selectionChange(value: ISelectOptions): void {
    this.data = setData(value, chartdata, this.dates);
    this.chartOptions = setChartOptions(
      this.chartOptions,
      this.data,
      ChartOptionsFunctionKey.Data
    );
  }

  ngOnInit(): void {
    this.dates = setXCoordinates(chartdata);
    this.chartOptions = setChartOptions(
      this.chartOptions,
      this.dates,
      ChartOptionsFunctionKey.Coordinates
    );
    this.data = setData(this.selectedValue, chartdata, this.dates);
    this.chartOptions = setChartOptions(
      this.chartOptions,
      this.data,
      ChartOptionsFunctionKey.Data
    );
  }
  chartOptions: Highcharts.Options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Transactions by Date",
    },
    legend: {
      layout: "horizontal",
    },
    xAxis: {
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Number Of Transaction",
        align: "middle",
      },
      labels: {
        overflow: "allow",
      },
    },
    plotOptions: {
      series: {
        stacking: "normal",
      },
    },
    exporting: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
  };

  instanceHandler(value: Highcharts.Chart) {
    this.chartInstance = value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.data = setData(this.selectedValue, chartdata, this.dates);
    this.chartOptions = setChartOptions(
      this.chartOptions,
      this.data,
      ChartOptionsFunctionKey.Data
    );
  }
  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }
}
