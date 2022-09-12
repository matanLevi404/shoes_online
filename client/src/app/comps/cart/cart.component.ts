import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface PeriodicCart {
  amount: number;
  brand: string;
  cart_id: number;
  color: string;
  gender: string;
  image: string;
  name: string;
  price: number;
  size: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  subTotalPrice: number;

  cartDisplayedColumns: string[] = [
    'img',
    'name',
    'brand',
    'gender',
    'color',
    'size',
    'amount',
    'price',
    'del',
  ];
  cart = [];
  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.onGetCart().then();
    this.cartService.cart.subscribe((cart: []) => {
      this.cart = cart;
    });
    this.cartService.sumPrice.subscribe((sum: number) => {
      this.subTotalPrice = sum;
    });
  }

  removeItemFromCart(product_id: number, size: number) {
    this.cartService.removeFromCart(product_id, size);
  }

  moveToCheckout() {
    this.router.navigateByUrl('shoesOnline/main/checkout');
  }

  emptyTheCart() {
    this.cartService.onEmptyTheCart();
  }
}
