import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit,AfterViewInit {
constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {}
user! :any
userId!: string;
adata!:Observable<{[key:string]:string}>;


handleNavigation() {
  this.router.navigate(['/ang-tables'])
}
ngOnInit(): void {
  this.userId= this.route.snapshot.params['id']
  this.apiService.fetchUserData(this.userId)
  .subscribe((response) => {
    this.user = response;
    console.log(this.user);
  } );
}

ngAfterViewInit(){
//  this.adata = this.apiService.fetchUserData(this.userId)
//   .subscribe((response) => {
//     this.user = response;
//     console.log(this.user);
//   } );
}
}
