import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import * as Highcharts from "highcharts";
import chartdata from "../../../assets/json/chartsData.json";
import {
  setChartOptions,
  setData,
  setXCoordinates,
} from "src/assets/utils/helpers";
import { ISelectOptions, ISeriesData } from "src/app/Interface";
import { ChartOptionsFunctionKey } from "../charts.enum";

@Component({
  selector: "app-linechart",
  templateUrl: "./linechart.component.html",
  styleUrls: ["./linechart.component.scss"],
})
export class LinechartComponent implements OnInit, AfterContentChecked {
  constructor(private cdref: ChangeDetectorRef) {}
  Highcharts: typeof Highcharts = Highcharts;
  data: ISeriesData[] = [];
  dates: string[] = [];
  chartInstance!: Highcharts.Chart;
  selectedValue: ISelectOptions = {
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
    title: {
      text: "Historic World Population by Region",
    },
    legend: {
      layout: "horizontal",
    },

    yAxis: {
      min: 0,
      title: {
        text: "Successful Transaction",
        align: "high",
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
    credits: {
      enabled: false,
    },
    navigation: {
      buttonOptions: {
        useHTML: true,
        enabled: false,
      },
    },
    exporting: {
      enabled: false,
      buttons: {
        contextButton: {
          enabled: false,
        },
      },
      csv: {
        annotations: {
          itemDelimiter: ";",
          join: false,
        },
        columnHeaderFormatter: null,
        dateFormat: "%Y-%m-%d %H:%M:%S",
        decimalPoint: null,
        itemDelimiter: null,
        lineDelimiter: " ",
      },
    },
  };

  instanceHandler(value: Highcharts.Chart) {
    this.chartInstance = value;
  }
  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }
}
