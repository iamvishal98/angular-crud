import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private authService: AuthService) {}
  currentRoute: boolean = false;
  routeSubscribtion!: Subscription;

  handleSignOut() {
    this.authService.Signout();
  }
  ngOnInit(): void {
    this.routeSubscribtion = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((data) => {
        data = data as NavigationEnd;
        this.currentRoute = data.urlAfterRedirects === "/not-found";
      });
  }

  ngOnDestroy(): void {
    this.routeSubscribtion.unsubscribe();
  }
}
