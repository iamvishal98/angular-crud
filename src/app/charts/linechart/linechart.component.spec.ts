import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LinechartComponent } from "./linechart.component";
import { AntdModule } from "src/app/ant.module";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import chartdata from "../../../assets/json/chartsData.json";
import { IChartData, ISelectOptions } from "src/app/Interface";
import * as Highcharts from "highcharts";
import { ChartOptionsFunctionKey } from "../charts.enum";

describe("LinechartComponent", () => {
  let component: LinechartComponent;
  let fixture: ComponentFixture<LinechartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinechartComponent],
      imports: [AntdModule, BrowserAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(LinechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe("Intialization Check", () => {
    it("should create", () => {
      expect(component).toBeTruthy();
    });

    it("should initialize", () => {
      expect(component.dates).toBeTruthy();
      expect(component.data).toBeTruthy();
      expect(component.Highcharts).toBeTruthy();
      expect(component.chartInstance).toBeUndefined();
      expect(component.optionList).toBeDefined();
      expect(component.selectedValue.value).toEqual("success");
    });
  });

  describe("Mehtods Chaining Check", () => {
    const setChartOptionsSpy = jasmine
      .createSpy("setChartOptions")
      .and.callFake(
        (chartOptions: Highcharts.Options, key: string, data: any) => {
          return [{}];
        }
      );
    const setDataSpy = jasmine
      .createSpy("setData")
      .and.callFake(
        (value: ISelectOptions, chartData: IChartData, data: any) => {
          return [{}];
        }
      );
    const setXCoordinatesSpy = jasmine
      .createSpy("setXCoordinates")
      .and.callFake((chartData: IChartData) => {
        return dates;
      });
    const value = { label: "Success", value: "success" };
    const dates = ["1-2-2021", "1-2-2022"];

    describe("selectionChange() method", () => {
      it("should call setData witrh provided value and chartData", () => {
        component.selectionChange(value);
        component.data = setDataSpy(value, chartdata, dates);
        expect(component.data.length).toBe(1);
      });

      it("should call setChartOptions() with provided value", () => {
        component.selectionChange(value);
        component.chartOptions = setChartOptionsSpy(
          value,
          ChartOptionsFunctionKey.Data,
          dates
        );
        expect(component.chartOptions).toBeDefined();
      });
    });

    describe("ngOnInit() method", () => {
      it("should call all the fn() in ngOnit() mehthod", () => {
        component.dates = setXCoordinatesSpy(chartdata);
        component.chartOptions = setChartOptionsSpy(
          chartdata,
          ChartOptionsFunctionKey.Coordinates,
          dates
        );
        component.data = setDataSpy(value, chartdata, dates);
        component.chartOptions = setChartOptionsSpy(
          value,
          ChartOptionsFunctionKey.Data,
          dates
        );
        expect(setXCoordinatesSpy).toHaveBeenCalled();
        expect(setDataSpy).toHaveBeenCalled();
        expect(setChartOptionsSpy).toHaveBeenCalled();
      });
    });

    describe("instanceHandler() method", () => {
      it("should call the method and set chartInstance value", () => {
        const value = {} as Highcharts.Chart;
        component.instanceHandler(value);
        expect(component.chartInstance).toEqual(value);
      });
    });

    describe("ngAfterContentChecked() method", () => {
      it("should call detectChanges method of cdref", () => {
        spyOn(component["cdref"], "detectChanges");
        component.ngAfterContentChecked();
        expect(component["cdref"].detectChanges).toHaveBeenCalled();
      });
    });

    describe("compareFn", () => {
      it("should return true if both o1 and o2 have a value property and their values are equal", () => {
        const o1 = { value: 1 };
        const o2 = { value: 1 };

        const result = component.compareFn(o1, o2);

        expect(result).toBe(true);
      });

      it("should return false if either o1 or o2 does not have a value property", () => {
        const o1 = { otherProp: 1 };
        const o2 = { value: 1 };

        const result = component.compareFn(o1, o2);

        expect(result).toBe(false);
      });

      it("should return false if the values of o1 and o2 are not equal", () => {
        const o1 = { value: 1 };
        const o2 = { value: 2 };

        const result = component.compareFn(o1, o2);

        expect(result).toBe(false);
      });
      
      it('should return true if both o1 and o2 are falsy values and are equal', () => {
        const o1 = null;
        const o2 = null;
    
        const result = component.compareFn(o1, o2);
    
        expect(result).toBe(true);
      });
    
      it('should return false if o1 and o2 are different falsy values', () => {
        const o1 = null;
        const o2 = undefined;
    
        const result = component.compareFn(o1, o2);
    
        expect(result).toBe(false);
      });
    });
  });

  describe("Checks For Data Equalities", () => {
    const successData = [
      {
        name: "worldline",
        data: [357, 191, 242, 354, 2319, 181, 1807, 0],
      },
      {
        name: "dalenys",
        data: [133, 69, 72, 69, 0, 59, 548, 0],
      },
      {
        name: "truevo",
        data: [62, 21, 49, 26, 306, 26, 259, 559],
      },
    ];
    const allData = [
      {
        name: "worldline",
        data: [497, 251, 306, 404, 2930, 267, 2360, 0],
      },
      {
        name: "dalenys",
        data: [164, 87, 85, 90, 0, 89, 785, 0],
      },
      {
        name: "truevo",
        data: [79, 26, 53, 29, 366, 42, 316, 616],
      },
    ];
    const optionList = [
      { label: "Success", value: "success" },
      { label: "All", value: "all" },
    ];
    
    it("intializing the component data for the first time", () => {
      expect(component.data).toEqual(successData);
    });

    it('should return success data when the selected value is "success"', () => {
      component.selectionChange(optionList[0]);
      expect(component.data).toEqual(successData);
    });
    it('should return all transaction data when the selected value is "all"', () => {
      component.selectionChange(optionList[1]);
      expect(component.data).toEqual(allData);
    });
  });
});
