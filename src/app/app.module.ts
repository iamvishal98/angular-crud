import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AntdModule } from './ant.module';
import { TodolistComponent } from './todolist/todolist.component';
import { ModalComponent } from './modal/modal.component';
import { TableComponent } from './table/table.component';
import { DataTablesModule } from 'angular-datatables';
import { PopoverComponent } from './table/popover/popover.component';
import { InterceptorService } from './services/interceptor.service';
import {  RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { UserComponent } from './user/user.component';

registerLocaleData(en);

const appRoutes: Routes = [
  {path:'', component: TodoComponent},
  {path:'ang-tables', component: TableComponent},
  {path:'ang-tables/user/:id', component: UserComponent},
]
@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    ModalComponent,
    TableComponent,
    PopoverComponent,
    TodoComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    AntdModule,
    DataTablesModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
