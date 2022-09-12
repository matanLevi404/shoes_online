import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shopping-logo',
  templateUrl: './shopping-logo.component.html',
  styleUrls: ['./shopping-logo.component.css'],
})
export class ShoppingLogoComponent implements OnInit {
  // @Input() drawer = new EventEmitter();
  @Input() drawer;
  hidden = false;
  badgeNum: number;
  isAdmin: boolean;
  isPopupDisplayed: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.authService.checkIfUserHasSession().then((data) => {
      this.isAdmin = data.isAdmin;
    });

    this.cartService.cart.subscribe((data: any) => {
      try {
        if (data.length) {
          this.badgeNum = data.length;
        }
      } catch (err) {
        return;
      }
    });
  }

  toggleDrawer() {
    this.drawer.toggle();
  }

  logout() {
    this.authService.onLogout(this.router);
  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  goToCart() {
    this.router.navigateByUrl('shoesOnline/main/cart');
    this.cartService.isCartDisplayed.next(true);
  }

  goToAddProduct() {
    this.router.navigateByUrl('shoesOnline/main/admin/addProduct');
  }
}
