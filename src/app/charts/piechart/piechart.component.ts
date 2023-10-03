import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import chartdata from "../../../assets/json/chartsData.json";
import { SeriesOptionsType } from "highcharts/highcharts.src";

@Component({
  selector: "app-piechart",
  templateUrl: "./piechart.component.html",
  styleUrls: ["./piechart.component.scss"],
})
export class PiechartComponent implements OnInit {
  data: any = [];
  chartData: any;
  serieData: Highcharts.SeriesOptionsType[] = [];
  Highcharts: typeof Highcharts = Highcharts;
  ngOnInit(): void {
    console.log(chartdata);
    this.chartData = chartdata;
    for (const key in this.chartData) {
      this.data = [
        ...this.data,
        {
          name: key,
          y: this.chartData[key].reduce(
            (acc: number, curr: any) => curr.successTransactions + acc,
            0
          ),
        },
      ];
    }
    console.log(this.data);
    this.data = [{ name: "Brands", colorByPoint: true , data:this.data}];
    this.chartOptions = {
      ...this.chartOptions,
      series: this.data as Highcharts.SeriesOptionsType[],
    };
  }

  chartOptions: Highcharts.Options = {
    chart: {
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Browser market shares in May, 2020",
      align: "left",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
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
      },
    },
    // series: this.data as SeriesOptionsType[],
  };
}
