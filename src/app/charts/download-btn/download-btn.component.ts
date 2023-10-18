import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import * as Highcharts from "highcharts";
import exporting from "highcharts/modules/exporting";
import ExportDataModule  from 'highcharts/modules/export-data';

exporting(Highcharts);
ExportDataModule(Highcharts);

@Component({
  selector: "app-download-btn",
  templateUrl: "./download-btn.component.html",
  styleUrls: ["./download-btn.component.scss"],
})
export class DownloadBtnComponent implements OnChanges {
  @Input() chartInstance!: Highcharts.Chart;
  @Input() options!: Highcharts.Options;
  isSubmenu!: { [key: string]: string } ;
  menuItems!: string[];

  ngOnChanges(changes: SimpleChanges): void {
    if(changes) {
      this.isSubmenu = {
        "Download Csv": this.chartInstance ? "csv" : "",
        "Download Xls": this.chartInstance ? "xls" : "",
        "Download Svg": this.chartInstance ? "svg" : "",
      }
      this.menuItems= Object.keys(this.isSubmenu);
      
  
    }
  }

  handleOperation(value: string) {
    switch (value) {
      case "csv":
        //  console.log("csv");
        this.chartInstance.downloadCSV();
        break;
      case "xls":
        // console.log("xls");
       this.chartInstance.downloadXLS();
        break;
      case "svg":
        // console.log(value);
        this.chartInstance.exportChart(
          {
            type: "image/svg+xml",
            filename: "chart",
          },
          this.options
        );
        break;
      default:
        console.log('default')
        break;
    }
  }
}
