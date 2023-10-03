import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NZ_I18N } from "ng-zorro-antd/i18n";
import { en_US } from "ng-zorro-antd/i18n";
import { registerLocaleData } from "@angular/common";
import en from "@angular/common/locales/en";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AntdModule } from "./ant.module";
import { TodolistComponent } from "./todolist/todolist.component";
import { ModalComponent } from "./modal/modal.component";
//import { TableComponent } from "./table/table.component";
//import { DataTablesModule } from "angular-datatables";
import { InterceptorService } from "./services/interceptor.service";
//import { RouterModule, Routes } from "@angular/router";
import { TodoComponent } from "./todo/todo.component";
//import { UserComponent } from "./user/user.component";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
//import { HighchartsChartModule } from 'highcharts-angular';
//import { ChartsComponent } from './charts/charts.component';
//import { BarchartComponent } from './charts/barchart/barchart.component';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    ModalComponent,
    //TableComponent,
    TodoComponent,
    //UserComponent,
    PageNotFoundComponent,
    LoginPageComponent,
    DashboardComponent,
    SignupPageComponent,
    ForgotPasswordComponent,
   // ChartsComponent,
   // BarchartComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AntdModule,
  //  DataTablesModule,
    LayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
   // HighchartsChartModule,

  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
