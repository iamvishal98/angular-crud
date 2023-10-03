import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}
  user!: any;
  userId!: string;
  adata!: Observable<{ [key: string]: string }>;

  handleNavigation() {
    this.router.navigate(["dashboard/ang-tables"]);
  }
  ngOnInit(): void {
    this.userId = this.route.snapshot.params["id"];
    this.apiService.fetchUserData(this.userId).subscribe((response) => {
      if (response) {
        this.user = response;
        console.log(this.user);
      }
    });
  }


}
