import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectorRef,
  AfterContentChecked,
} from "@angular/core";
import * as Highcharts from "highcharts";
import chartdata from "../../../assets/json/chartsData.json";
import { ISelectOptions } from "src/app/Interface";
import { setDataPie } from "src/assets/utils/helpers";

@Component({
  selector: "app-piechart",
  templateUrl: "./piechart.component.html",
  styleUrls: ["./piechart.component.scss"],
})
export class PiechartComponent implements OnInit, AfterContentChecked {
  constructor(private cdref: ChangeDetectorRef) {}
  data: any = [];
  chartData: any;
  Highcharts: typeof Highcharts = Highcharts;
  @Output() chartChnage = new EventEmitter<{ label: string; value: string }>();
  chartInstance!: Highcharts.Chart;

  seriesOptions = {
    name: "Transactions",
    colorByPoint: true,
    data: [],
  };

  optionList = [
    { label: "Success", value: "success" },
    { label: "All", value: "all" },
  ];
  selectedValue = { label: "Success", value: "success" };
  compareFn = (o1: any, o2: any): boolean =>
    o1 && o2 ? o1.value === o2.value : o1 === o2;
  selectionChange(value: { label: string; value: string }): void {
    this.chartChnage.emit(value);
    this.setData(value);
  }

  // SeriesOptionTypes[] is not taking type:"pie" 
  setData(value: ISelectOptions) {
    this.data = setDataPie(value, chartdata);
    this.chartOptions = {
      ...this.chartOptions,
      series: [
        { ...this.seriesOptions, data: this.data },
      ] as Highcharts.SeriesOptionsType[],
    };
  }


  // setData(value: { label: string; value: string }) {
  //   this.chartData = chartdata;
  //   this.data = [];
  //   for (const key in this.chartData) {
  //     this.data = [
  //       ...this.data,
  //       {
  //         name: key,
  //         y: this.chartData[key].reduce(
  //           (acc: number, curr: any) =>
  //             value.label === "All"
  //               ? curr.allTransactions + acc
  //               : curr.successTransactions + acc,
  //           0
  //         ),
  //       },
  //     ];
  //   }

  //   //this.data = [{ name: "Transactions", colorByPoint: true, data: this.data }];
  //   this.chartOptions = {
  //     ...this.chartOptions,
  //     series: ([{...this.seriesOptions, data: this.data}] as Highcharts.SeriesOptionsType[])
  //   };
  // }

  ngOnInit(): void {
    this.setData(this.selectedValue);
  }

  chartOptions: Highcharts.Options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Transactions",
      align: "center",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    exporting: {
      enabled: false,
      csv: {
        itemDelimiter: ",",
      },
      buttons: {
        contextButton: {
          menuItems: ["downloadCSV", "downloadXLS", "downloadPNG"],
        },
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
        showInLegend: true,
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
