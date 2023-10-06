import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectorRef,
  AfterContentChecked,
  AfterViewInit,
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
export class PiechartComponent
  implements OnInit, AfterContentChecked, AfterViewInit
{
  constructor(private cdref: ChangeDetectorRef) {}
  data: any = [];
  chartData: any;
  Highcharts: typeof Highcharts = Highcharts;
  @Output() chartChnage = new EventEmitter<ISelectOptions>();
  chartInstance!: Highcharts.Chart;

  seriesOptions = {
    name: "Transactions",
    colorByPoint: true,
    data: [],
    type: "pie",
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
    this.data = setDataPie(value, chartdata);
    this.chartInstance.series[0].setData(this.data);
  }

  ngOnInit(): void {
    this.data = setDataPie(this.selectedValue, chartdata);
  }

  chartOptions: Highcharts.Options = {
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
    series: [
      {
        name: "Transactions",
        data: [],
        type: "pie",
      },
    ],
  };

  instanceHandler(value: Highcharts.Chart) {
    this.chartInstance = value;
  }
  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  ngAfterViewInit(): void {
    if (this.chartInstance) {
      this.chartInstance.series[0].setData(this.data);
    }
  }
}
