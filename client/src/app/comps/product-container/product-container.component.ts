import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.css'],
})
export class ProductContainerComponent implements OnInit {
  products;
  isAdmin: boolean;

  constructor(
    private productsService: ProductsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.productsService.products.subscribe((products) => {
      this.products = products;
    });

    this.authService.checkIfUserHasSession().then((data) => {
      this.isAdmin = data.isAdmin;
    });
  }
}
