import { Component, OnInit, EventEmitter, Output, ViewChild } from "@angular/core";
import * as Highcharts from "highcharts";
import chartdata from "../../../assets/json/chartsData.json";
import exporting from "highcharts/modules/exporting";
import ExportDataModule  from 'highcharts/modules/export-data';
import { HighchartsChartComponent } from "highcharts-angular";

exporting(Highcharts);
ExportDataModule(Highcharts);
@Component({
  selector: "app-piechart",
  templateUrl: "./piechart.component.html",
  styleUrls: ["./piechart.component.scss"],
})
export class PiechartComponent implements OnInit {
  @ViewChild(HighchartsChartComponent)chartComponent!: HighchartsChartComponent;
  data: any = [];
  chartData: any;
  Highcharts: typeof Highcharts = Highcharts;
  @Output() chartChnage = new EventEmitter<{ label: string; value: string }>();

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

  setData(value: { label: string; value: string }) {
    this.chartData = chartdata;
    this.data = [];
    for (const key in this.chartData) {
      this.data = [
        ...this.data,
        {
          name: key,
          y: this.chartData[key].reduce(
            (acc: number, curr: any) =>
              value.label === "All"
                ? curr.allTransactions + acc
                : curr.successTransactions + acc,
            0
          ),
        },
      ];
    }
    this.data = [{ name: "Transactions", colorByPoint: true, data: this.data }];
    this.chartOptions = {
      ...this.chartOptions,
      series: this.data as Highcharts.SeriesOptionsType[],
    };
  }

  ngOnInit(): void {
    this.setData(this.selectedValue);
   // this.chartInstance.chartInstance.subscribe()
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
      enabled:false,
      csv: {
        itemDelimiter: ',',
      },
      buttons: {

        contextButton: {
          menuItems:['downloadCSV','downloadXLS','downloadPNG']
        }
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
        point: {
          events: {
            click: function (event) {
              console.log(event);
            },
          },
        },
        showInLegend: true,
      },
    },
  };

  handleDownload() {

    //  (this.chartComponent as any).chart.downloadCSV()
 
  }

  onChartInstance(value: any) {
    console.log(value)
  }
  // chartCallback: Function = function(chart : Highcharts.Chart) {
  //   console.log("Chart instance: ", chart.);
  // };

  handleOperation(value: string){
    switch(value) {
      case 'csv':
        console.log('csv');
        (this.chartComponent as any).chart.downloadCSV()
        break;
      case 'xls':
        console.log('xls');
        (this.chartComponent as any).chart.downloadXLS();
        break;
      case 'svg':
        console.log(value);
        (this.chartComponent as any).chart.downloadSVG()
        break;
      default: 
        console.log('default');
        break;
    }
  }
}
