import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import * as Highcharts from "highcharts";
import chartdata from "../../../assets/json/chartsData.json";

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
  selector: "app-barchart",
  templateUrl: "./barchart.component.html",
  styleUrls: ["./barchart.component.scss"],
})
export class BarchartComponent implements OnInit, OnChanges {
  Highcharts: typeof Highcharts = Highcharts;
  data: barchartData[] = [];
  dates: string[] = [];
  @Input() selectedValue: { label: string; value: string } = {
    label: "Success",
    value: "success",
  };

  optionList = [
    { label: "Success", value: "success" },
    { label: "All", value: "all" },
  ];
  compareFn = (o1: any, o2: any): boolean =>
    o1 && o2 ? o1.value === o2.value : o1 === o2;
  selectionChange(value: { label: string; value: string }): void {
    this.setData(value);
  }

  setData(value: { label: string; value: string }) {
    let maxkey = 0;
    this.data = [];
    const chartData: { [key: string]: dt[] } = chartdata;
    for (const key in chartData) {
      if (chartData[key].length > maxkey)
        this.dates = chartData[key].map((item) => item.date);
    }
    let actualObj: any = {};
    for (const key in chartData) {
      let obj: { [key: string]: any } = {};
      chartData[key].forEach((item) => {
        obj[item.date] =
          value?.label === "Success"
            ? item.successTransactions
            : item.allTransactions;
      });
      actualObj[key] = obj;
      actualObj[key] = this.dates.map((item: any) =>
        actualObj[key][item] ? actualObj[key][item] : 0
      );

      this.data = [...this.data, { name: key, data: actualObj[key] }];
    }

    this.chartOptions = {
      ...this.chartOptions,
      xAxis: {
        ...this.chartOptions.xAxis,
        categories: this.dates,
      },
      series: this.data as Highcharts.SeriesOptionsType[],
    };
  }

  ngOnInit(): void {
    this.setData(this.selectedValue);
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

  ngOnChanges(changes: SimpleChanges): void {
    this.setData(this.selectedValue);
  }
}
