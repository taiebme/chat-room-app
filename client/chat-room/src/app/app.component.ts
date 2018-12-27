import {AfterViewChecked, ChangeDetectorRef, Component} from '@angular/core';
import {AuthService} from "./services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked{

  activeUser = false;

  constructor(private authenticationService: AuthService,
              private router: Router,
              private cdRef : ChangeDetectorRef){

  }

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/home']);
  }

  ngAfterViewChecked(): void {
    this.activeUser = !!localStorage.getItem('activeUser');
    this.cdRef.detectChanges();
  }
}
