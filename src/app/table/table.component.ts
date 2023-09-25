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

  visible: boolean = false;
  label: string= '';
  value: string='';

  Close(): void {
    this.visible = false;
  }
  Open(data: any, colind: number): void {
    this.visible=true;
    this.label = columns[colind].title
    this.value=data;
  }

  ngOnInit(): void {
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback: any) => {
        this.http
          .get('../assets/demo-data.json', dataTablesParameters)
          .subscribe((resp: any) => {
            //console.log(Math.floor((Date.now() / 1000) % 60));
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

            //console.log(Math.floor((Date.now() / 1000) % 60));
          });
      },
      columns,
      scrollX: true,
      deferRender: true,
      rowCallback: (row: Node, data: any, index: number) => {
        const self = this;
        $('.itemId', row).on('click', () => {
          this.Open(data.textId,0);
        });
        $('td:eq(2)', row).on('click', () => {
         this.Open(data.textName,2);
        });
        // return row;
        // $('td:eq(9)', row).html( `<img src='${data.image1}' alt='image-1'/>` );
        // $('td:eq(9)', row).DataTable({createdRow: () => {

        // }})
      },
    };
  }
}
