import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChanges,SimpleChange } from '@angular/core';
import { DownloadBtnComponent } from './download-btn.component';
import { AntdModule } from 'src/app/ant.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DownloadBtnComponent', () => {
  let component: DownloadBtnComponent;
  let fixture: ComponentFixture<DownloadBtnComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[AntdModule,BrowserAnimationsModule],
      declarations: [DownloadBtnComponent],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(DownloadBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Intialization Check', () => {
    it('should intialize data',() => {
      expect(component.chartInstance).toBeUndefined();
      expect(component.options).toBeUndefined();
      expect(component.isSubmenu).toBeUndefined();
      expect(component.menuItems).toBeUndefined();
    })
  });


  it('on btn-click dropdown menu should appear',async () => {
    const btn =  fixture.nativeElement.querySelector('.download-action-item');
    btn.click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.whenStable().then(()=>{    
      let doc = fixture.nativeElement.ownerDocument;
      let dropdownMenu=doc.querySelector('.cdk-overlay-container .ant-dropdown-menu ');
      expect(dropdownMenu).toBeTruthy();
    }); 
  });

  it('should define chartInstance',() => {
    expect(component.chartInstance).not.toBeDefined();
    const mockChartInstance = {} as Highcharts.Chart;
    component.chartInstance = mockChartInstance;
    fixture.detectChanges();
    expect(component.chartInstance).toBeDefined();
  }) 
  
  it('should set isSubmenu & menuItems correctly', () => {
    const changes: SimpleChanges = {};
    const mockChartInstance = {} as Highcharts.Chart;
    component.chartInstance = mockChartInstance;
    component.ngOnChanges(changes);
    expect(component.isSubmenu).toEqual({
      "Download Csv": "csv",
      "Download Xls": "xls",
      "Download Svg": "svg"
    });
    expect(component.menuItems).toEqual(["Download Csv", "Download Xls", "Download Svg"]);
  });

  it('Should render menuItems on dropdown menu and handleOperation should be called upon clicking',async () => {
    const btn =  fixture.nativeElement.querySelector('.download-action-item');
    spyOn(component, 'handleOperation');
    const changes: SimpleChanges = {};
    component.ngOnChanges(changes)
    btn.click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.whenStable().then(() => {
      let doc = fixture.nativeElement.ownerDocument;
      let dropdownMenuItems=doc.querySelectorAll('.cdk-overlay-container .ant-dropdown-menu li');
      expect(dropdownMenuItems.length).toEqual(component.menuItems.length);
      console.log(doc.querySelector('.cdk-overlay-container .ant-dropdown-menu li'));
      doc.querySelector('.cdk-overlay-container .ant-dropdown-menu li').click();
      expect(component.handleOperation).toHaveBeenCalled();
      
    });
  });

  describe("handleOperation", () => {
    let chartInstance = {
      downloadCSV: jasmine.createSpy("downloadCSV"),
      downloadXLS: jasmine.createSpy("downloadXLS"),
      exportChart: jasmine.createSpy("exportChart"),
    };
  
    it("should call downloadCSV when value is 'csv'", () => {
      component.chartInstance = chartInstance as unknown as Highcharts.Chart
      const value = "csv";
      component.handleOperation(value);
      expect(component.chartInstance.downloadCSV).toHaveBeenCalled();
    });
    it("should call downloadXLS when value is 'xls'", () => {
      component.chartInstance = chartInstance as unknown as Highcharts.Chart
      const value = "xls";
      component.handleOperation(value);
      expect(component.chartInstance.downloadXLS).toHaveBeenCalled();
    });
    it("should call exportChart with correct arguments when value is 'svg'", () => {
      component.chartInstance = chartInstance as unknown as Highcharts.Chart
      const value = "svg";
      component.handleOperation(value);
      expect(component.chartInstance.exportChart).toHaveBeenCalled();
    });
  
  });

});
