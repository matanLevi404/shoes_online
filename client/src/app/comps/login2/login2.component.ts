import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css'],
})
export class Login2Component implements OnInit {
  userData = {
    msg: 'no user has logged in',
    hasCart: false,
    hasSession: false,
    ordersAmount: 0,
    productsAmount: 0,
    username: 'Guest',
  };
  form: FormGroup;
  hide: boolean = true;
  isDisabled: boolean;
  loginTitle: string;
  btnAction: string;
  errorMsg: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.minLength(5),
        Validators.maxLength(10),
        Validators.required,
      ]),
    });

    this.authService.checkIfUserHasSession().then((data) => {
      this.userData = data;
    });
  }

  async onLoginSubmit() {
    const isWorked = this.authService.onLogin(
      this.form.value.username,
      this.form.value.password
    );
    isWorked.then((data) => {
      if (data) {
        this.router.navigateByUrl('shoesOnline/main/category/all');
        this.errorMsg = false;
      } else {
        this.errorMsg = true;
      }
    });
  }

  onResumeOrStartClick() {
    this.router.navigateByUrl('shoesOnline/main/category/all');
  }

  moveToSignUp() {
    this.router.navigateByUrl('register');
  }
}
