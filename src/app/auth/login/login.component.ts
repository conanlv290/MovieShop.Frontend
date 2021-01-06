import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Login } from 'src/app/shared/models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLogin: Login = {
    email: '',
    password: '',
  };
  invalidLogin: boolean;
  returnUrl:string;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    this.route.queryParams.subscribe(
      (params) => (this.returnUrl = params.returnUrl || '/')
    );
  }
  login() {
    this.authService.login(this.userLogin).subscribe(
      (response) => {
        if (response) {
          // this.router.navigate(['/']);
          this.router.navigate([this.returnUrl]);
        }
      },
      (err: any) => {
        console.log(err);
        console.log(err.message);
        this.invalidLogin = true;
      }
    );
  }
}
