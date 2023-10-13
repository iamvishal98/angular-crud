import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { columns } from "./columns";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) {}
  allData: any = [];
  dtOptions: any = {};

  visible: boolean = false;
  label: string = "";
  value: string = "";


  handleNavigation() {
    this.router.navigate(["/"]);
    //router.naigate does know root url, hence specifying relative path work which is not the case in routerLink
    //this.router.navigate(['/ang-tables'],{relativeTo:this.route})
  }

  ngOnInit(): void {
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback: any) => {
        // this.http
        //   .get("../assets/demo-data.json", dataTablesParameters)
        this.apiService.fetchTableData(dataTablesParameters)
          .subscribe((resp: any) => {
            const formattedData = resp.data.map((item: any) => {
              return {
                id: `<a class="itemId">${item.id}</a>`,
                textId: item.id,
                email: item.email,
                name: `<a>${item.name}</a>`,
                textName: item.name,
                dob: item.dob,
                postode: item.postode,
                street: item.street,
                telephone: item.telephone,
                town: item.town,
                image1: `<img class='Image-tab' src='${item.image1}' alt='image-1'/>`,
                image2: `<img class='Image-tab' src='${item.image2}' alt='image-1'/>`,
                image3: `<img class='Image-tab' src='${item.image3}' alt='image-1'/>`,
                image4: `<img class='Image-tab' src='${item.image4}' alt='image-1'/>`,
                image5: `<img class='Image-tab' src='${item.image5}' alt='image-1'/>`,
                image6: `<img class='Image-tab' src='${item.image6}' alt='image-1'/>`,
                image7: `<img class='Image-tab' src='${item.image7}' alt='image-1'/>`,
                image8: `<img class='Image-tab' src='${item.image8}' alt='image-1'/>`,
                image9: `<img class='Image-tab' src='${item.image9}' alt='image-1'/>`,
                image10: `<img class='Image-tab' src='${item.image10}' alt='image-1'/>`,
              };
            });
            callback({
              recordsTotal: formattedData.length,
              recordsFiltered: formattedData.length,
              data: formattedData,
            });
          });
      },
      columns,
      scrollX: true,
      deferRender: true,
      pagingType: "simple",
      rowCallback: (row: Node, data: any, index: number) => {
        const self = this;
        $(".itemId", row).on("click", () => {
          //this.router.navigate([`ang-tables/user/${data.textId}`])
          this.router.navigate(["dashboard/ang-tables", data.textId]);
        });
        $("td:eq(2)", row).on("click", () => {
          this.router.navigate([`dashboard/ang-tables/${data.textId}`]);
        });
        // return row;
        // $('td:eq(9)', row).html( `<img src='${data.image1}' alt='image-1'/>` );
        // $('td:eq(9)', row).DataTable({createdRow: () => {

        // }})
      },
    };
  }

}
