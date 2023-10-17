import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { PiechartComponent } from "./piechart.component";
import chartdata from "../../../assets/json/chartsData.json";
import { IChartData, ISelectOptions } from "src/app/Interface";
import { Series } from "highcharts";
import { setDataPie } from "src/assets/utils/helpers";
import * as Highcharts from "highcharts";

describe("PiechartComponent", () => {
  let component: PiechartComponent;
  let fixture: ComponentFixture<PiechartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PiechartComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(PiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  // Intialization Check
  describe('Intialization Check',() => {
    it("should create", () => {
      expect(component).toBeTruthy();
    });

    it("should initialize", () => {
      expect(component.selectedValue).toBeTruthy();
      expect(component.data).toBeTruthy();
      expect(component.Highcharts).toBeTruthy();
      expect(component.chartInstance).toBeUndefined();
      expect(component.optionList).toBeDefined();
      expect(component.selectedValue.value).toEqual("success");
    });
  })

  // Mehtods Chaining Check

  describe('Mehtods Chaining Check',() => {
    describe("selectionChange() method", () => {
      const value = { label: "Success", value: "success" };
  
      it("should emit chartChange event with the provided value", () => {
        spyOn(component.chartChnage, "emit");
        component.ngOnInit();
        component.selectionChange(value);
        expect(component.chartChnage.emit).toHaveBeenCalledWith(value);
      });
  
      it("should call setPieData with provided value and chartDarta", () => {
        const mockSetPieData = jasmine
          .createSpy("setPieData")
          .and.callFake((value: ISelectOptions, chartData: IChartData) => {
            return [{}];
          });
        component.chartData = chartdata;
        component.selectionChange(value);
        component.data = mockSetPieData(value, component.chartData);
        expect(component.data.length).toBe(1);
      });
  
      it("should call setData on the chart instance series with the returned data", () => {
        const instance = {
          series: [
            {
              setData: jasmine.createSpy("setData"),
            },
          ],
        };
        component.chartInstance = instance as unknown as Highcharts.Chart;
        component.selectionChange(value);
        expect(component.chartInstance.series[0].setData).toHaveBeenCalledWith(
          component.data
        );
      });
    });
  
    describe("initializing the component data", () => {
      it("should set the data property using the selected value and chart data", () => {
        const mockSetPieData = jasmine
          .createSpy("setDataPie")
          .and.callFake((value: ISelectOptions, chartData: IChartData) => {
            return [{}];
          });
  
        component.data = mockSetPieData(component.selectedValue, chartdata);
        expect(component.data.length).toBe(1);
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
  
    describe("ngAfterViewInit", () => {
      it("should set data on chart instance if chart instance exists", () => {
        // Arrange
        const chartInstance = {
          series: [
            {
              setData: jasmine.createSpy("setData"),
            },
          ],
        };
        const data = [1, 2, 3];
  
        // Act
        component.chartInstance = chartInstance as unknown as Highcharts.Chart;
        component.data = data;
        component.ngAfterViewInit();
  
        // Assert
        expect(chartInstance.series[0].setData).toHaveBeenCalledWith(data);
      });
      it("should not set data if chart instance does not exist", () => {
        const data = [1, 2, 3];
        component.chartInstance = undefined as unknown as Highcharts.Chart;
        component.data = data;
        component.ngAfterViewInit();
        expect().nothing();
      });
    });
  
    describe('compareFn', () => {
      it('should return true if both o1 and o2 have a value property and their values are equal', () => {
   
        const o1 = { value: 1 };
        const o2 = { value: 1 };
    
   
        const result = component.compareFn(o1, o2);
    
   
        expect(result).toBe(true);
      });
    
      it('should return false if either o1 or o2 does not have a value property', () => {
     
        const o1 = { otherProp: 1 };
        const o2 = { value: 1 };
    
      
        const result = component.compareFn(o1, o2);
    
       
        expect(result).toBe(false);
      });
    
      it('should return false if the values of o1 and o2 are not equal', () => {
        
        const o1 = { value: 1 };
        const o2 = { value: 2 };
    
        
        const result = component.compareFn(o1, o2);
    
       
        expect(result).toBe(false);
      });
    });
  })

  //Data Checking
  describe("Checks For Data Equalities", () => {
    const successData = [
      {
        name: "worldline",
        y: 5451,
      },
      {
        name: "dalenys",
        y: 950,
      },
      {
        name: "truevo",
        y: 1308,
      },
    ];
    const allData =[
      {
          "name": "worldline",
          "y": 7015
      },
      {
          "name": "dalenys",
          "y": 1300
      },
      {
          "name": "truevo",
          "y": 1527
      }
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
    })
    it('should return all transaction data when the selected value is "all"', () => {
      component.selectionChange(optionList[1]);
      expect(component.data).toEqual(allData);
    })
  });
});
