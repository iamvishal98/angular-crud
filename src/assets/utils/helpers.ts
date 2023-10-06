import { IChartData, ISelectOptions, ISeriesData } from "src/app/Interface";
import * as Highcharts from "highcharts";

export function setXCoordinates(chartData: IChartData) {
  let maxkey = 0;
  let dates: string[] = [];
  for (const key in chartData) {
    if (chartData[key].length > maxkey)
      dates = chartData[key].map((item) => item.date);
  }

  return dates;
}

export function setChartOptions(
  chartOptions: Highcharts.Options,
  data: any,
  key: string
) {
  switch (key) {
    case "crd":
      chartOptions = {
        ...chartOptions,
        xAxis: {
          ...chartOptions.xAxis,
          categories: data,
        },
      };

      return chartOptions;

    case "data":
      chartOptions = {
        ...chartOptions,
        series: data as Highcharts.SeriesOptionsType[],
      };

      return chartOptions;

    
    case 'pie' : 
      // chartOptions = {
      //   ...chartOptions,
      //   series: [
      //     ...chartOptions.series,

      //   ]
      // }

    default:
      return chartOptions;
  }
}


export function setData(
  value: ISelectOptions,
  chartData: IChartData,
  data: any
): ISeriesData[] {
  let actualObj: any = {};
  let result: any = [];
  for (const key in chartData) {
    let obj: { [key: string]: any } = {};
    chartData[key].forEach((item) => {
      obj[item.date] =
        value?.label === "Success"
          ? item.successTransactions
          : item.allTransactions;
    });
    actualObj[key] = obj;
    actualObj[key] = data.map((item: any) =>
      actualObj[key][item] ? actualObj[key][item] : 0
    );

    result = [...result, { name: key, data: actualObj[key] }];
  }

  return result;
}


export function setDataPie(  value: ISelectOptions,  chartData: IChartData) {
    let data: any = [];
    for (const key in chartData) {
        data = [
          ...data,
          {
            name: key,
            y: chartData[key].reduce(
              (acc: number, curr: any) =>
                value.label === "All"
                  ? curr.allTransactions + acc
                  : curr.successTransactions + acc,
              0
            ),
          },
        ];
    }

   return data
}