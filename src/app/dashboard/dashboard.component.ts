import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private authService: AuthService,
    public breakpointObserver: BreakpointObserver
  ) {}
  currentRoute: boolean = false;
  routeSubscribtion!: Subscription;
  isMobileMenu: boolean = false;
  position: "top" | "right" | "bottom" | "left" = "top";
  handleSignOut() {
    this.authService.Signout();
  }

  handleClick() {
    this.isMobileMenu = !this.isMobileMenu;
  }
  ngOnInit(): void {
    this.routeSubscribtion = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((data) => {
        data = data as NavigationEnd;
        this.currentRoute = data.urlAfterRedirects === "/not-found";
      });

    this.breakpointObserver
      .observe(["(max-width: 500px)"])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.position = "left";
        } else {
          this.position = "top";
        }
      });
  }

  ngOnDestroy(): void {
    this.routeSubscribtion.unsubscribe();
    this.breakpointObserver.ngOnDestroy();
  }
}
