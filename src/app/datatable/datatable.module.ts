import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { DataTablesModule } from "angular-datatables";
import { UserComponent } from './user/user.component';
//import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { DataTableRoutingModule } from './datatable-routing.module';
import { AntdModule } from '../ant.module';


@NgModule({
  declarations: [
    TableComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
   // NzDescriptionsModule,
    DataTableRoutingModule,
    AntdModule
  ]
})
export class DatatableModule { }
