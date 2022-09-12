import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-panelc',
  templateUrl: './panelc.component.html',
  styleUrls: ['./panelc.component.css'],
})
export class PanelcComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  userData = {
    err: 'no user has logged in',
    msg: '',
    hasCart: false,
    hasSession: false,
    ordersAmount: 0,
    productsAmount: 0,
    username: 'Guest',
  };

  ngOnInit(): void {
    this.authService.userData.subscribe((data: any) => {
      this.userData = data;
    });
  }
}
