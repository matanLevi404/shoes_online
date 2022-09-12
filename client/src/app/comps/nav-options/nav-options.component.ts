import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-nav-options',
  templateUrl: './nav-options.component.html',
  styleUrls: ['./nav-options.component.css'],
})
export class NavOptionsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.cartService.onGetCart();
      if (
        Object.keys(param).length === 0 &&
        !this.route.snapshot.routeConfig.path.includes('search') &&
        !this.route.snapshot.routeConfig.path.includes('filterBy')
      ) {
        this.cartService.isCartDisplayed.next(true);
        return;
      }

      if (this.route.snapshot.routeConfig.path.includes('search')) {
        return;
      }

      // if (this.route.snapshot.routeConfig.path.includes('filterBy')) {
      //   return;
      // }

      this.productsService.getProducts(param['category']).then();
    });
  }

  onClick() {
    this.cartService.isCartDisplayed.next(false);
  }
}
