import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChartsComponent } from "./charts.component";

const routes: Routes = [{ path: "", component: ChartsComponent, pathMatch:"full" }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartRoutingModule {}
