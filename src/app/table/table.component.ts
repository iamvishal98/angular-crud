import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';
import { columns } from './columns';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  constructor(private apiService: ApiService, private http: HttpClient) {}
  allData: any = [];
  dtOptions: DataTables.Settings = {};
  // dataTablesParameters = { scrollY: 400}

  // someClickHandler(info: any): void {
  //   console.log(info)
  // }

  ngOnInit(): void {
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback : any) => {
        this.apiService.fetchData().subscribe((resp : any) => {
          //  const formattedData= resp.data.map((item : any) => {
          //     return {
          //       'id': item.id,
          //       'email':item.email,
          //       'name':item.name,
          //       'dob':item.dob,
          //       'postode':item.postode,
          //       'street':item.street,
          //       'telephone':item.telephone,
          //       'town':item.town,
          //       'image1':`<img class='Image-tab' src='${item.image1}' alt='image-1'/>`
          //     }
          //   })
            callback({
              recordsTotal: resp.data.length,
              recordsFiltered: resp.data.length,
              data: resp.data
            });
          });
      },
     columns,
     scrollX:true,
     searching:true,
    //  rowCallback: (row: Node, data: any , index: number) => {
    //   const self = this;
    //   // Unbind first in order to avoid any duplicate handler
    //   // (see https://github.com/l-lin/angular-datatables/issues/87)
    //   // Note: In newer jQuery v3 versions, `unbind` and `bind` are 
    //   // deprecated in favor of `off` and `on`
    //   // $('td', row).off('click');
    //   // $('td', row).on('click', () => {
    //   //   self.someClickHandler(data);
    //   //   //console.log(row)
    //   // });
    //   // return row;
    //   //console.log(data.image1)
    //   $('td:eq(9)', row).html( `<img src='${data.image1}' alt='image-1'/>` );
    //   // $('td:eq(9)', row).DataTable({createdRow: () => {

    //   // }})
    // },
    
    }
  }

  fetchAllData(): void {
    this.apiService.fetchData().subscribe((response: any) => {
      this.allData = response.data;
      //console.log(this.allData)
    });
  }
}
