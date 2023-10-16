import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from "@angular/core/testing";
import { TableComponent } from "./table.component";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DataTableDirective, DataTablesModule } from "angular-datatables";
import { ApiService } from "src/app/services/api.service";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { Router } from "@angular/router";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from "@angular/platform-browser-dynamic/testing";

describe("TableComponent", () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let service: ApiService;
  let router: Router;

  //   beforeAll(() => {
  //     // Deactivate teardown for these tests because of a problem with
  //     // the primeNg dialog.
  //     TestBed.resetTestEnvironment();
  //     TestBed.initTestEnvironment(
  //         BrowserDynamicTestingModule,
  //         platformBrowserDynamicTesting(),
  //         {teardown: {destroyAfterEach: false}}
  //     );
  // });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        DataTablesModule,
      ],
      declarations: [TableComponent],
    });
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ApiService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  let responseData = [
    {
      id: "N0AZPH3AOPT8YGI1",
      name: "Frederic Snow",
      dob: "2022-07-07",
      street: "5282 Burleyhurst",
      town: "Brierley Hill",
      postode: "DT06 6IS",
      telephone: "+98-9082-434-097",
      pets: ["Toby", "Bear"],
      score: 9.2,
      email: "erasmoleclair90@yahoo.com",
      image1:
        "https://images.unsplash.com/photo-1694445083738-1e1f6104e9e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      image2:
        "https://images.unsplash.com/photo-1694445083738-1e1f6104e9e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      image3:
        "https://images.unsplash.com/photo-1694445083738-1e1f6104e9e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      image4:
        "https://images.unsplash.com/photo-1694445083738-1e1f6104e9e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      image5:
        "https://images.unsplash.com/photo-1694445083738-1e1f6104e9e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      image6:
        "https://images.unsplash.com/photo-1694445083738-1e1f6104e9e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      image7:
        "https://images.unsplash.com/photo-1694445083738-1e1f6104e9e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      image8:
        "https://images.unsplash.com/photo-1694445083738-1e1f6104e9e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      image9:
        "https://images.unsplash.com/photo-1694445083738-1e1f6104e9e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      image10:
        "https://images.unsplash.com/photo-1694445083738-1e1f6104e9e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    },
  ];

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Header text", () => {
    let header = fixture.nativeElement.querySelector("h1").innerHTML;
    expect(header).toBe("Angular DataTables");
  });

  it("DT-OPTIONS IS TO SET CORRECTLY", () => {
    expect(component.dtOptions.ajax).toBeTruthy();
    expect(component.dtOptions.columns).toBeTruthy();
    expect(component.dtOptions.scrollX).toBeTrue();
    expect(component.dtOptions.deferRender).toBeTrue();
    expect(component.dtOptions.pagingType).toEqual("simple");
  });

  it("SHOULD CALL FetchTableData() METHOD ON dtOptions.ajax() AND SET FORMATED DATA CORRECTLY", fakeAsync(() => {
    spyOn(service, "fetchTableData").and.returnValue(
      of({ data: responseData })
    );
    const callBackSpy = jasmine.createSpy("callback");
    let dataTablesParameters: any;
    component.dtOptions.ajax(dataTablesParameters, callBackSpy);

    expect(service.fetchTableData).toHaveBeenCalledWith(dataTablesParameters);
    let returneddata = [
      {
        id: '<a class="itemId">N0AZPH3AOPT8YGI1</a>',
        textId: "N0AZPH3AOPT8YGI1",
        email: "erasmoleclair90@yahoo.com",
        name: "<a>Frederic Snow</a>",
        textName: "Frederic Snow",
        dob: "2022-07-07",
        postode: "DT06 6IS",
        street: "5282 Burleyhurst",
        telephone: "+98-9082-434-097",
        town: "Brierley Hill",
        image1:
          "<img class='Image-tab' src='https://images.unsplash.com/photo-1694445083738-1e1f6104e9e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80' alt='image-1'/>",
        image2:
          "<img class='Image-tab' src='https://images.unsplash.com/photo-1694445083738-1e1f6104e9e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80' alt='image-1'/>",
        image3:
          "<img class='Image-tab' src='https://images.unsplash.com/photo-1694445083738-1e1f6104e9e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80' alt='image-1'/>",
        image4:
          "<img class='Image-tab' src='https://images.unsplash.com/photo-1694445083738-1e1f6104e9e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80' alt='image-1'/>",
        image5:
          "<img class='Image-tab' src='https://images.unsplash.com/photo-1694445083738-1e1f6104e9e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80' alt='image-1'/>",
        image6:
          "<img class='Image-tab' src='https://images.unsplash.com/photo-1694445083738-1e1f6104e9e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80' alt='image-1'/>",
        image7:
          "<img class='Image-tab' src='https://images.unsplash.com/photo-1694445083738-1e1f6104e9e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80' alt='image-1'/>",
        image8:
          "<img class='Image-tab' src='https://images.unsplash.com/photo-1694445083738-1e1f6104e9e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80' alt='image-1'/>",
        image9:
          "<img class='Image-tab' src='https://images.unsplash.com/photo-1694445083738-1e1f6104e9e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80' alt='image-1'/>",
        image10:
          "<img class='Image-tab' src='https://images.unsplash.com/photo-1694445083738-1e1f6104e9e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80' alt='image-1'/>",
      },
    ];

    expect(callBackSpy).toHaveBeenCalledWith({
      recordsTotal: 1,
      recordsFiltered: 1,
      data: returneddata,
    });

  }));

  it("SHOULD NAVIGATE TO USERS PAGE WHEN CLICKED ON ITEMID ", () => {
    const row = document.createElement("tr");
    let data = 
      {
        textId: 'N0AZPH3AOPT8YGI1',
      }
    ;
    const index = 0;
    const itemId = document.createElement('a');
    itemId.classList.add('itemId');
    itemId.innerHTML='N0AZPH3AOPT8YGI1'
    row.appendChild(itemId);
    spyOn(router, 'navigate');
    component.dtOptions.rowCallback(row,data,index);
    itemId.click();
    expect(router.navigate).toHaveBeenCalledWith(['dashboard/ang-tables', data.textId]);
  });


});
