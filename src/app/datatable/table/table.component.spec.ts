import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TableComponent } from "./table.component";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DataTablesModule } from "angular-datatables";
import { ApiService } from "src/app/services/api.service";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";

describe("TableComponent", () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, DataTablesModule],
      declarations: [TableComponent],
    });
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ApiService);
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

  it("fetchDataTable() METHOD", () => {
    let dataTablesParameters: any;
    spyOn(service, "fetchTableData").and.returnValue(of(responseData))
    
    component.ngOnInit();
    //service.fetchTableData(dataTablesParameters);
    expect(service.fetchTableData).toHaveBeenCalledWith(dataTablesParameters)
    let ele = fixture.debugElement.query(By.css('.row-border.dataTable '));
    console.log(ele);
    

   //spyOn(service.fetchTableData(dataTablesParameters),"subscribe").and.returnValue(of(responseData))

  });
});
