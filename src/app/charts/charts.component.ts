import { Component } from "@angular/core";
import * as Highcharts from "highcharts";

@Component({
  selector: "app-charts",
  templateUrl: "./charts.component.html",
  styleUrls: ["./charts.component.scss"],
})
export class ChartsComponent {
  Highcharts: typeof Highcharts = Highcharts;
  data = [
    {
      name: "Year 1800",
      data: [107, 31, 635, 203, 2],
    },
    {
      name: "Year 1900",
      data: [133, 156, 947, 408, 6],
    },
    {
      name: "Year 2008",
      data: [973, 914, 4054, 732, 34],
    },
  ];

  barData = [
    {
      name: "Brands",
      colorByPoint: true,
      data: [
        {
          name: "Chrome",
          y: 70.67,
        },
        {
          name: "Edge",
          y: 14.77,
        },
        {
          name: "Firefox",
          y: 4.86,
        },
        {
          name: "Safari",
          y: 2.63,
        },
        {
          name: "Internet Explorer",
          y: 1.53,
        },
        {
          name: "Opera",
          y: 1.4,
        },
        {
          name: "Sogou Explorer",
          y: 0.84,
        },
        {
          name: "QQ",
          y: 0.51,
        },
        {
          name: "Other",
          y: 2.6,
        },
      ],
    },
  ];
  chartOptions: Highcharts.Options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Historic World Population by Region",
    },
    subtitle: {
      text: "Source: Wikipedia.org",
    },
    legend: {
      layout: "horizontal",
      // align: "left",
      // verticalAlign: "top",
      // x: 250,
      // y: 100,
      // floating: true,
      // borderWidth: 1,
      // shadow: true,
    },
    xAxis: {
      categories: ["Africa", "America", "Asia", "Europe", "Oceania"],
      title: {
        text: null,
      },
      //crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: "Population (millions)",
        align: "high",
      },
      labels: {
        overflow: "allow",
      },
    },
    tooltip: {
      valueSuffix: " millions",
    },
    plotOptions: {
      // bar: {
      //   dataLabels: {
      //     enabled: true,
      //   },
      // },
      series: {
        stacking: "normal",
      },
    },
    credits: {
      enabled: false,
    },
    series: this.data as Highcharts.SeriesOptionsType[],
  };

  chartOptionsPie: Highcharts.Options = {
    chart: {
      //plotBackgroundColor: "blue",
      //plotBorderWidth: 2,
      // plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Browser market shares in May, 2020",
      //align: "left",
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
    series: this.barData as Highcharts.SeriesOptionsType[],
  };
}
