import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-panela',
  templateUrl: './panela.component.html',
  styleUrls: ['./panela.component.css'],
})
export class PanelaComponent implements OnInit {
  isLoginDisplayed: boolean = true;
  goTo = 'Sign up';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  moveToSignUp() {
    this.router.navigateByUrl('register');
    //   if (this.goTo == 'Sign up') {
    //     this.goTo = 'Login';
    //   } else {
    //     this.goTo = 'Sign up';
    //   }
    //   this.isLoginDisplayed = !this.isLoginDisplayed;
    // }
  }
}
