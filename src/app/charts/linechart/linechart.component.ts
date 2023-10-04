import { Component, OnInit, ViewChild } from "@angular/core";
import * as Highcharts from "highcharts";
import chartdata from "../../../assets/json/chartsData.json";

import exporting from "highcharts/modules/exporting";
import { HighchartsChartComponent } from "highcharts-angular";

exporting(Highcharts);
interface dt {
  date: string;
  name: string;
  allTransactions: number;
  successTransactions: number;
  acquirer: string;
}

interface barchartData {
  name: string;
  data: number[];
}

@Component({
  selector: "app-linechart",
  templateUrl: "./linechart.component.html",
  styleUrls: ["./linechart.component.scss"],
})
export class LinechartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  data: barchartData[] = [];
  dates: string[] = [];
  @ViewChild(HighchartsChartComponent)chartInstance!: HighchartsChartComponent;

  ngOnInit(): void {
    //console.log(chartdata);
    let maxkey = 0;
    const chartData: { [key: string]: dt[] } = chartdata;
    for (const key in chartData) {
      if (chartData[key].length > maxkey)
        this.dates = chartData[key].map((item) => item.date);
    }

    this.dates = this.dates.sort((a: any, b: any) => {
      const date1 = new Date(a);
      const date2 = new Date(b);
      return date1.getTime() - date2.getTime();
    });

    // console.log(this.dates);
    let actualObj: any = {};
    for (const key in chartData) {
      let obj: { [key: string]: any } = {};
      chartData[key].forEach((item) => {
        obj[item.date] = item.successTransactions;
      });
      actualObj[key] = obj;
      actualObj[key] = this.dates.map((item: any) =>
        actualObj[key][item] ? actualObj[key][item] : 0
      );
      // console.log(actualObj);
      this.data = [...this.data, { name: key, data: actualObj[key] }];
    }
    //console.log(this.data)
    this.chartOptions = {
      ...this.chartOptions,
      xAxis: {
        ...this.chartOptions.xAxis,
        categories: this.dates,
      },
      series: this.data as Highcharts.SeriesOptionsType[],
    };
  }

  chartOptions: Highcharts.Options = {
    // chart: {
    //   type: "column",
    // },
    title: {
      text: "Historic World Population by Region",
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
    // xAxis: {
    //   categories: this.date,
    //   title: {
    //     text: null,
    //   },
    //   //crosshair: true
    // },
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
    // tooltip: {
    //   valueSuffix: null,
    // },
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
    navigation: {
      buttonOptions: {
        useHTML: true,
        enabled: false,
      },
    },
    exporting: {
      enabled: true,
      // allowHTML:true,
      buttons: {
        contextButton: {
          enabled: false,
        },
        exportButton: {
          text: `<span nz-icon nzType="download" nzTheme="outline"></span>`,
          menuItems: [
            "downloadPNG",
            "downloadJPEG",
            "downloadPDF",
            "downloadSVG",
          ],
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
    // series: this.data as Highcharts.SeriesOptionsType[],
  };

  handleExport() {
    ((this.chartInstance as any).chart as Highcharts.Chart).exportChart({
      type: "image/jpeg",
      filename: "chart.png",
    },this.chartOptions);
  }
}
