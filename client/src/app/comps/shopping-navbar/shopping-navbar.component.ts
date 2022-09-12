import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-shopping-navbar',
  templateUrl: './shopping-navbar.component.html',
  styleUrls: ['./shopping-navbar.component.css'],
})
export class ShoppingNavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {
    this.route.queryParams.subscribe((data: object) => {
      const val: string = data['searchValue'];
      this.productsService.searchProducts(val);
    });
  }

  ngOnInit(): void {}

  moveToSearchRoute(searchInp: HTMLInputElement) {
    this.router.navigateByUrl(
      'shoesOnline/main/search?searchValue=' + searchInp.value
    );
  }
}
